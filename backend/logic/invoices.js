const Invoice = require('../models/invoiceModel');
const Order = require('../models/orderModel');
const Item = require('../models/itemModel');
const pdf = require('pdf-creator-node');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function generateInvoices(items) {
    //find current max invoice number
    var highestInvoiceNo = 100000;
    Invoice.findOne().sort('-invoiceNo').exec((err, maxInvoice) => {
        if (maxInvoice) {
            highestInvoiceNo = maxInvoice.invoiceNo;
        }
    });

    var itemDataSet = [];
    var uniqueSuppliers = [];
    for (item of items) {
        let itemData = await Item.findById(item);
        itemDataSet.push(itemData);

        if (!uniqueSuppliers.includes(itemData.supplier)) {
            uniqueSuppliers.push(itemData.supplier);
        }
    }

    console.log(uniqueSuppliers);
    
    for (supplier of uniqueSuppliers) {
        highestInvoiceNo = highestInvoiceNo + 1;

        let items = [];
        itemDataSet.map((item) => {
            if (item.supplier == supplier) {
                items.push(item._id);
            }
        });

        const invoice = new Invoice({
            invoiceNo: highestInvoiceNo,
            supplier,
            items
        });

        await invoice.save(function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
} 

async function generatePdfFile(invoiceId) {
    try {
    const now = new Date();
    var invoice = await Invoice.findById(invoiceId);
    var filePath = path.join(__dirname, '../pdf/output/Invoice__' + invoice.supplier.replace(' ', '_') + '_' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay() + '_' + Math.floor(Math.random() * 100000) + '.pdf');
    var logoMap = fs.readFileSync(path.join(__dirname, '../pdf/logo.png'));
    var logo = logoMap.toString('base64');
    var html = fs.readFileSync(path.join(__dirname, '../pdf/template.html'), "utf8");
    
    //console.log(html);
    var options = {
        format: "A4",
        orientation: "portrait",
        border: "0",
        footer: {
            height: "15mm",
            contents: {
                default: '<div class="footer">PAGE {{page}}/{{pages}}</span>'
            }
        }
    }

    var orders = await findOrders(invoice);
    html = html.replace('[[orders]]', await compileOrders(orders));
    
    var document = {
        html: html,
        data: {
            logo,
            invoiceNo: invoice.invoiceNo,
            supplier: invoice.supplier,
            invoiceDate: (new Date()).toLocaleDateString("en-US", {month: 'long', day: 'numeric', year: 'numeric'}),
            invoiceTime: (new Date()).getHours().toString().replace(/^(\d)$/, '0$1') + ':' + (new Date()).getMinutes().toString().replace(/^(\d)$/, '0$1')
        },
        path: filePath,
        type: "",
    };

    await pdf
        .create(document, options)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.error(error);
        });
    } catch (err) {
        console.error(err.message);
    }

    return filePath;
}

async function findOrders(invoice) {
    var orders = [];

    for (itemId of invoice.items) {
        var item = await Item.findById(itemId);
        var order = await Order.findById(item.order);
        if (!orders.find(x => x.orderNumber == order.orderNumber)) {
            orders.push(order);
        }
    }

    return orders;
}

async function compileOrders(orders) {
    //const fullPageHeight = 1045 //Windows value
    const fullPageHeight = 1105 //Heroku value

    var html = fs.readFileSync(path.join(__dirname, '../pdf/template_order.html'), "utf8");
    var output = "";
    var total = 0;

    var pageHeight = 150;

    for (order of orders) {
        var prevPageHeight = pageHeight;

        pageHeight += 170;
        let orderHtml = html;
        orderHtml = orderHtml.replace('[[orderNumber]]', order.orderNumber);
        orderHtml = orderHtml.replace('[[customerName]]', order.customerName);

        var orderItems = await Item.find({ order: order._id });
        var subtotal = calculateSubtotal(orderItems);
        total = total + subtotal;
        orderHtml = orderHtml.replace('[[subtotal]]', subtotal);

        var itemsHtml = '';
        for (item of orderItems) {
            pageHeight += 100;
            let itemHtml = fs.readFileSync(path.join(__dirname, '../pdf/template_item.html'), "utf8");
            itemHtml = itemHtml.replace('[[productName]]', item.productName);
            itemHtml = itemHtml.replace('[[itemImage]]', await getItemImageData(item.imageUrl));
            itemHtml = itemHtml.replace('[[modelNumber]]', item.modelNumber);
            itemHtml = itemHtml.replace('[[variant]]', item.productVariant);
            itemHtml = itemHtml.replace('[[quantity]]', item.quantity);
            itemHtml = itemHtml.replace('[[cost]]', item.cost);

            itemsHtml += itemHtml;
        }

        orderHtml = orderHtml.replace('[[items]]', itemsHtml);

        console.log(pageHeight);
        if (pageHeight > fullPageHeight) {
            pageHeight = pageHeight + 30 - prevPageHeight;
            output += '<div style="height:' + (fullPageHeight + 30 - prevPageHeight) + 'px">&nbsp;</div>';
        }

        output += orderHtml;
    }

    console.log(pageHeight+100);
    if (pageHeight + 100 > fullPageHeight) {
        output += '<div style="height:' + (fullPageHeight - pageHeight) + 'px">&nbsp;</div>';
    }
    var totalHtml = fs.readFileSync(path.join(__dirname, '../pdf/template_total.html'), "utf8");
    totalHtml = totalHtml.replace('[[total]]', Math.ceil(total*100)/100);
    output += totalHtml;
    return output;
}

function calculateSubtotal(orderItems) {
    var subtotal = 0;
    orderItems.map((orderItem) => {
        subtotal = subtotal + orderItem.cost;
    });
    return Math.ceil(subtotal*100)/100;
}

async function getItemImageData(imageUrl) {
    let imageMap = await axios.get(imageUrl, {responseType: 'arraybuffer'});
    let image = Buffer.from(imageMap.data).toString('base64');
    return image;   
}

module.exports = {
    generateInvoices,
    generatePdfFile
}