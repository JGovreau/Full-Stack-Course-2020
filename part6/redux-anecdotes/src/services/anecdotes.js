import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    votes: 0,
    id: getId()
  }

  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (id) => {
  // Get the anecdote
  const response = await axios.get(`${baseUrl}/${id}`)

  // Create the new anecdote object with the incremented votes
  const votedAnecdote = { ...response.data, votes: response.data.votes + 1}

  // Put the update anecdote
  const newResponse = await axios.put(`${baseUrl}/${id}`, votedAnecdote)

  return newResponse.data

}

export default { getAll, createNew, voteAnecdote }