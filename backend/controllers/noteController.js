const asyncHandler = require('express-async-handler')

const Note = require('../models/noteModel');

// @desc    Create note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
    if (!req.body.body) {
      res.status(400)
      throw new Error('Please add text')
    }
  
    const note = await Note.create({
      order: req.body.order,
      item: req.body.item,
      body: req.body.body,
      postedBy: req.body.postedBy,
      postedByName: req.body.postedByName,
      postedDate: req.body.postedDate,
      updatedBy: null,
      updatedByName: null,
      updatedDate: null
    })
  
    res.status(200).json(note)
  })

  // @desc    Get notes
  // @route   GET /api/notes/
  // @access  Private
  const getNotes = asyncHandler(async (req, res) => {
      const notes = await Note.find({});
      res.status(200).json(notes);
  })

  // @desc    Update note
  // @route   PUT /api/notes/:id
  // @access  Private
  const updateNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
  
    if (!note) {
      res.status(400)
      throw new Error('Note not found')
    }
  
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updatedNote)
  })

  // @desc    Delete note
  // @route   DELETE /api/note/:id
  // @access  Private
  const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)
  
    if (!note) {
      res.status(400)
      throw new Error('Note not found')
    }
  
    await note.remove()
  
    res.status(200).json({ id: req.params.id })
  })

  module.exports = {
      createNote,
      getNotes,
      updateNote,
      deleteNote
  }