const express = require('express')
const router = express.Router()
const {
    createInvoice,
    getInvoices,
    createPdf
  } = require('../controllers/invoiceController')
  
  const { protect } = require('../middleware/authMiddleware')
  
  router.route('/').post(protect, createInvoice)
  router.route('/').get(protect, getInvoices)
  router.route('/createPdf').post(protect, createPdf)
  
  module.exports = router
  