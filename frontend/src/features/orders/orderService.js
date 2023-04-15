import axios from 'axios'
import { api_link } from '../../constants'

const API_URL = `${api_link}/orders/`

// Get orders
const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);
    return response.data;
}

// Get orders
const getItems = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + 'getItems', config);
    return response.data;
}



// Update order
const updateOrder = async (orderId, orderData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_URL + orderId, orderData, config)
  
    return response.data
}

// Update item
const updateItem = async (itemId, itemData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.put(API_URL + 'updateItem/' + itemId, itemData, config)
  
    return response.data
}


const orderService = {
    getOrders,
    getItems,
    updateOrder,
    updateItem
}

export default orderService