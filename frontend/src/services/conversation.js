import axios from 'axios'

const baseURL = '/api/conversations'

const createNew = async (convoInfo) => {
  const response = await axios.post(baseURL, convoInfo)
  return response.data
}

export default {
  createNew
}