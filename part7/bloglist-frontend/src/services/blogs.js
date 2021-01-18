import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)

  return response.data  
}

const deleteBlog = async (id) => {
  const config = {
    headers: {Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

const incrementLikes = async (blog) => {

  const incrementedBlog = {
    user: blog.user.id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }

  const response = await axios.put(`${baseUrl}/${blog.id}`, incrementedBlog)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }

  console.log('in service', id, comment)
  const response = await axios.post(`${baseUrl}/${id}/comments`, {comment}, config)
  return response.data
}

export default { getAll, setToken, create, incrementLikes, deleteBlog, addComment }