import axios from 'axios'
import { api_link } from '../../constants'

const API_URL = `${api_link}/import/`

// Import orders
const importOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + 'importOrders', null, config);
    return response.data;
}

const importService = {
    importOrders
}

export default importService