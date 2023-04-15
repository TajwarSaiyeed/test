import axios from 'axios'
import { api_link } from '../../constants'

const API_URL = `${api_link}/bags/`
// Get bags
const getBags = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

// Update bags
const updateBags = async (bagsId, bagsData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_URL + bagsId, bagsData, config)
  
    return response.data
}

const bagsService = {
    getBags,
    updateBags
}

export default bagsService