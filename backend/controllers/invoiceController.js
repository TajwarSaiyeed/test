const asyncHandler = require('express-async-handler');
const {generateInvoices, generatePdfFile} = require('../logic/invoices');
const Invoice = require('../models/invoiceModel');

// @desc    Create invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {  
    await generateInvoices(req.body);
    res.status(200).json("Success")
  })

  // @desc    Get invoices
  // @route   GET /api/invoices/
  // @access  Private
  const getInvoices = asyncHandler(async (req, res) => {
      const invoices = await Invoice.find({});
      res.status(200).json(invoices);
  })

  // @desc    Create PDF of invoice
  // @route   POST /api/invoices/createPdf
  // @access  Private
  const createPdf = asyncHandler(async (req, res) => {  
    var filePath = await generatePdfFile(req.body.invoiceId);
    console.log('filePath created');
    console.log(filePath);
    res.download(filePath);
  })

  module.exports = {
      createInvoice,
      getInvoices,
      createPdf
  }