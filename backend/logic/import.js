const { getProducts, getOrders, getInventory } = require('./shopifyApi');
const Order = require('../models/orderModel');
const Item = require('../models/itemModel');
const { addLog } = require('./log');

async function runImport() {
    await addLog('normal', 'Do Auto-Import');
    const shopifyOrders = await getOrders();
    const products = await getProducts();

    for(const shopifyOrder of shopifyOrders) {
        const orderExists = await Order.findOne({ orderNumber: shopifyOrder.order_number.toString() });

        if (!orderExists) {
            await createOrder(shopifyOrder, products);
        }
    }

    console.log('Import completed without errors');
}

async function createOrder(shopifyOrder, products) {
    try {
        //await addLog('normal', `Create Order:'${shopifyOrder.order_number}'`);
        const order = new Order({
            orderNumber: shopifyOrder.order_number,
            customerName: shopifyOrder.customer.default_address.name,
            customerAddress: 
                (shopifyOrder.customer.default_address.company ? shopifyOrder.customer.default_address.company + ', ' : '')
                + (shopifyOrder.customer.default_address.address1 ? shopifyOrder.customer.default_address.address1 + ', ' : '')
                + (shopifyOrder.customer.default_address.address2 ? shopifyOrder.customer.default_address.address2 + ', ' : '')
                + (shopifyOrder.customer.default_address.city ? shopifyOrder.customer.default_address.city + ', ' : '')
                + (shopifyOrder.customer.default_address.province ? shopifyOrder.customer.default_address.province + ', ' : '')
                + (shopifyOrder.customer.default_address.country ? shopifyOrder.customer.default_address.country : '')
                + (shopifyOrder.customer.default_address.zip ? ' ' + shopifyOrder.customer.default_address.zip : ''),
            shippingCost: shopifyOrder.shipping_lines[0].price,
            status: !shopifyOrder.closed_at?null:'archived',            
            trackingNumberCustomer: null,
            dateOrdered: shopifyOrder.created_at,
            dateClosed: shopifyOrder.closed_at,
            datePacked: null,
            dateDispatched: null,
            dateCompleted: null
        });

        await order.save(function (err) {
            if (err) {
                console.log(err);
            }
        });

        for(const shopifyItem of shopifyOrder.line_items) {
            const product = products.find(x => x.id == shopifyItem.product_id);
            if (product) {
                await createItem(shopifyItem, product, order);
            } else {
                console.log(`Non-Exist Product: '${product.title}'`);
            }
            
        };
    } catch (err) {
        console.log(err.message);
    }
}

async function createItem(lineItem, product, order) {
    try {
        console.log(`Processing line Item:${lineItem.id}, Product:'${lineItem.product_id}', Variant:'${lineItem.variant_id}'`);
        const productImage = product.image.src;
        let variantImage = "", inventoryItem = null, variants = [];

        const variant = product.variants.find(x => x.id == lineItem.variant_id);
        if (variant) {
            inventoryItem = await getInventory(variant.inventory_item_id);
            const images = product.images;
            variantImage = variant.image_id?images.find(item => item.id == variant.image_id).src:"";

            if (variant.option1) {
                variants.push({option:product.options[0].name, value:variant.option1});
            }
            if (variant.option2) {
                variants.push({option:product.options[1].name, value:variant.option2});
            }
            if (variant.option3) {
                variants.push({option:product.options[2].name, value:variant.option3});
            }
        }

        const item = new Item({
            order,        
            shopifyProductId: lineItem.product_id,
            shopifyProductHandle: product.handle,
            quantity: lineItem.quantity,
            productName: lineItem.title,
            productVariant: variants,
            price: lineItem.price,
            cost: inventoryItem?inventoryItem.cost:0,
            imageUrl: variantImage!=""?variantImage:productImage,
            modelNumber: lineItem.sku,
            supplier: product.vendor,
            status: null,
            condition: null,
            flyersAdded: null,
            trackingNumberAgent: null,
            dateSupplierSent: null,
            dateArrived: null
        });

        await item.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    catch (e) {
        console.log(e.message);
    }
}

module.exports = {
    runImport,
    createOrder,
    createItem
}