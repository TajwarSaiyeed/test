import axios from 'axios'
import { api_link } from '../../constants'

const API_URL = `${api_link}/invoices/`

// Create invoice
const createInvoice = async (items, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, items, config)
  
    return response.data
}

// Get invoices
const getInvoices = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
}

// Create invoice
const createPdf = async (invoiceId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob'
    }
  
    const response = await axios.post(API_URL + 'createPdf', invoiceId, config)

    var filename =  response.headers['content-disposition'].split('filename=')[1];
    filename = filename.substring(1, filename.length - 1);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); 
    document.body.appendChild(link);
    link.click();

    return "Success"
}

const invoiceService = {
    createInvoice,
    getInvoices,
    createPdf
}

export default invoiceService