const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const Item = require('../models/itemModel');

// @desc    Get orders
// @route   GET /api/orders/
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({});
    res.status(200).json(orders);
})

// @desc    Get items
// @route   GET /api/orders/getItems
// @access  Private
const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find({});
    res.status(200).json(items);
})

// @desc    Update order
// @route   PUT /api/orders/:id
// @access  Private
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(400)
    throw new Error('Order not found')
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedOrder)
})

// @desc    Update item
// @route   PUT /api/orders/updateItem/:id
// @access  Private
const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (!item) {
    res.status(400)
    throw new Error('Order not found')
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedItem)
})

module.exports = {
    getOrders,
    getItems,
    updateOrder,
    updateItem
}