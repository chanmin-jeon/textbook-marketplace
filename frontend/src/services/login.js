import axios from 'axios'

const baseURL = '/api/login'

const login = async (credentials) => {
  const userInfo = await axios.post(baseURL, credentials)
  return userInfo.data
}

export default { login }