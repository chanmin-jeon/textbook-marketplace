import axios from 'axios'
const baseURL = '/api/textbooks'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createListing = async (listingInfo) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseURL, listingInfo, config)
  return response.data
}

const deleteListing = async (textbookId) => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.delete(`${baseURL}/${textbookId}`, config)

  return response.data
}

export default {
  getAll,
  createListing, 
  setToken, 
  deleteListing
}