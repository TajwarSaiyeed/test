const express = require('express')
const router = express.Router()
const {
    createOrder,
    updateOrder,
    createProduct,
    updateProduct,
    deleteProduct,
  } = require('../controllers/webhookController')
  
  
  router.route('/createOrder').post(createOrder)
  router.route('/updateOrder').post(updateOrder)
  router.route('/createProduct').post(createProduct)
  router.route('/updateProduct').post(updateProduct)
  router.route('/deleteProduct').post(deleteProduct)
  
  module.exports = router