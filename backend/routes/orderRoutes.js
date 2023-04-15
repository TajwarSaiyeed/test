const express = require('express')
const router = express.Router()
const {
    getOrders,
    getItems,
    updateOrder,
    updateItem
  } = require('../controllers/orderController')
  
  const { protect } = require('../middleware/authMiddleware')
  
  router.route('/').get(protect, getOrders)
  router.route('/getItems').get(protect, getItems)
  router.route('/:id').put(protect, updateOrder)
  router.route('/updateItem/:id').put(protect, updateItem)
  
  module.exports = router
  