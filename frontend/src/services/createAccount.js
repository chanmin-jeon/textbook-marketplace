import axios from 'axios'

const baseURL = '/api/users'

const create = async (accountInfo) => {
  const newUser = await axios.post(baseURL, accountInfo)
  return newUser.data
}

export default {create}