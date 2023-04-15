const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Order = require('../models/orderModel');
const Item = require('../models/itemModel');

const {validateShopifyRequest, createShopifyOrder, updateShopifyOrder} = require('../logic/webhook');
const {addLog} = require('../logic/log');

// @desc    Create Order hook
// @route   POST /api/webhook/createOrder
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
    console.log('Create Order Request from Shopify!');
    //console.log(req.body);
    /*
    if (
        validateShopifyRequest(req) &&
        req.body &&
        req.body.hasOwnProperty("line_items")
      ) {
        await createShopifyOrder(req.body);

        res.sendStatus(200);
      } else {
        console.log("Request invalid.");
    
        // Send authentication error response
        res.sendStatus(401);
      }
      */

      await createShopifyOrder(req.body);

      res.sendStatus(200);
})

const updateOrder = asyncHandler(async (req, res) => {
  await addLog('normal', 'Update Order Request from Shopify!');
  
  const orderNumber = req.body.order_number;
  const order = await Order.findOne({ orderNumber: orderNumber.toString() });
  if (!order) {
    await createShopifyOrder(req.body);      
  } else {
    await updateShopifyOrder(order._id, order.status, req.body);
  }


  res.sendStatus(200);
})

const createProduct = asyncHandler(async (req, res) => {
    res.sendStatus(200);
})

const updateProduct = asyncHandler(async (req, res) => {
    res.sendStatus(200);
})

const deleteProduct = asyncHandler(async (req, res) => {
    res.sendStatus(200);
})

module.exports = {
    createOrder,
    updateOrder,
    createProduct,
    updateProduct,
    deleteProduct
}