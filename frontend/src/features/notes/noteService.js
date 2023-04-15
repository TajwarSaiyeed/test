import axios from 'axios'
import { api_link } from '../../constants'

const API_URL = `${api_link}/notes/`

// Create note
const createNote = async (noteData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, noteData, config)
  
    return response.data
}

// Get notes
const getNotes = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

// Update note
const updateNote = async (noteId, noteData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_URL + noteId, noteData, config)
  
    return response.data
}

// Delete note
const deleteNote = async (noteId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + noteId, config)

  return response.data
}

const noteService = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
}

export default noteService