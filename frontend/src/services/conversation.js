import axios from 'axios'

const baseURL = '/api/conversations'

const createNew = async (convoInfo) => {
  const response = await axios.post(baseURL, convoInfo)
  return response.data
}

const getAllUserConvo = async (userId) => {
  const response = await axios.get(`${baseURL}/${userId}`)
  return response.data
}

const getConversationMessages = async (conversationId) => {
  const response = await axios.get(`${baseURL}/${conversationId}/messages`)
  return response.data
}

const sendMessage = async (conversationId, messageContent) => {
  const response = await axios.post(`${baseURL}/${conversationId}/messages`, messageContent)
  return response.data
}

export default {
  createNew, 
  getAllUserConvo, 
  getConversationMessages, 
  sendMessage
}