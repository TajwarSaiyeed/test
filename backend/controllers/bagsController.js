const asyncHandler = require('express-async-handler');

const Bags = require('../models/bagsModel');

// @desc    Get bags
// @route   GET /api/bags
// @access  Private
const getBags = asyncHandler(async (req, res) => {
    const bags = await Bags.findOne({})
  
    res.status(200).json(bags)
  })

// @desc    Update bags
// @route   PUT /api/bags/:id
// @access  Private
const updateBags = asyncHandler(async (req, res) => {
  const bags = await Bags.findById(req.params.id)

  const updatedBags = await Bags.findByIdAndUpdate(bags._id, req.body, {
    new: true,
  })

  res.status(200).json(updatedBags)
})

module.exports = {
  getBags,
  updateBags
}