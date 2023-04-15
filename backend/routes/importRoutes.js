const express = require('express')
const router = express.Router()
const {
    importOrders
  } = require('../controllers/importController')
  
  const { protect } = require('../middleware/authMiddleware')
  
  router.route('/importOrders').post(protect, importOrders)
  
  module.exports = router
  