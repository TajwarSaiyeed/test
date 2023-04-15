const asyncHandler = require('express-async-handler');
const { runImport } = require('../logic/import');
const getProducts = require('../logic/import').runImport;

// @desc    Test API by retrieving products
// @route   GET /api/orders/testapi
// @access  Private
const importOrders = asyncHandler(async (req, res) => {
    await runImport();
    res.status(200).json("Success");
})

module.exports = {
    importOrders
}