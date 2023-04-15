const express = require('express')
const router = express.Router()
const {
  getBags,
  updateBags
} = require('../controllers/bagsController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getBags)
router.route('/:id').put(protect, updateBags)

module.exports = router