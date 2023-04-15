const express = require('express')
const router = express.Router()
const {
    createNote,
    getNotes,
    updateNote,
    deleteNote
  } = require('../controllers/noteController')
  
  const { protect } = require('../middleware/authMiddleware')
  
  router.route('/').post(protect, createNote)
  router.route('/').get(protect, getNotes)
  router.route('/:id').put(protect, updateNote)
  router.route('/:id').delete(protect, deleteNote)
  
  module.exports = router
  