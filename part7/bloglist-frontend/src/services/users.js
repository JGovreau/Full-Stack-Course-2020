import axios from 'axios'
const baseUrl = '/api/users'

// Get all users from the backend
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Create new user in the backend
const create = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default { getAll, create }