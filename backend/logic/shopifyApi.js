const axios = require('axios');

const shopLink = process.env.SHOPIFY_APP_URL;
const shopToken = process.env.SHOPIFY_API_SECKEY;

const axiosInstance = axios.create({
    baseURL: shopLink,
    timeout: 20000,
    headers: {'X-Shopify-Access-Token': shopToken}
})

async function getProducts() {
    try {
        var products = [];
        var lastId = 0;
        var shouldContinue = true;

        while (shouldContinue) {
            await axiosInstance.get('/products.json?since_id=' + lastId)
                .then(function (response) {
                    const newProducts = response.data.products;
                    products = products.concat(newProducts);

                    if (newProducts.length < 5) {
                        shouldContinue = false;
                    } else {
                        lastId = newProducts[newProducts.length - 1].id;
                    }
                });
        }

        return products;
    } catch(e) {
        console.log('getProducts() failed: ' + e.message);
    }
}

async function getProduct(id) {
    try {
        let productItem = null;
        await axiosInstance.get('/products/' + id + '.json')
            .then(function (response) {
                productItem = response.data.product;
            });

        return productItem;
    } catch(e) {
        console.log('getProduct() failed: ' + e.message);
    }
}


async function getOrders() {
    try {
        var orders = [];
        var lastId = 0;
        var shouldContinue = true;

        while (shouldContinue) {
            await axiosInstance.get('/orders.json?status=any&since_id=' + lastId)
                .then(function (response) {
                    const newOrders = response.data.orders;
                    orders = orders.concat(newOrders);

                    if (newOrders.length < 5) {
                        shouldContinue = false;
                    } else {
                        lastId = newOrders[newOrders.length - 1].id;
                    }
                });
        }

        return orders;
    } catch(e) {
        console.log('getOrders() failed: ' + e.message);
    }
}

async function getInventory(id) {
    try {
        var inventoryItem;
        await axiosInstance.get('/inventory_items/' + id + '.json')
            .then(function (response) {
                inventoryItem = response.data.inventory_item;
            });

        return inventoryItem;
    } catch(e) {
        console.log('getProducts() failed: ' + e.message);
    }
}

module.exports = {
    getProduct,
    getProducts,
    getOrders,
    getInventory
}