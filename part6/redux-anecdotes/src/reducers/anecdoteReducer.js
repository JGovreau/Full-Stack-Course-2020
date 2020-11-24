import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [ ...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    case 'INCREMENT_ANECDOTE':
      const id = action.data.id
      const anecdoteToIncrement = state.find(n => n.id === id)

      const incrementedAnecdote = {
        ...anecdoteToIncrement,
        votes: anecdoteToIncrement.votes + 1
      }

      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : incrementedAnecdote  
      ).sort((a,b) => 
        (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)
      )
    
      default:
        return state
  }
  
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const createdAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: createdAnecdote
    })
  }
}

export const incrementAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'INCREMENT_ANECDOTE',
      data: { id }
    })
  }
}

export default anecdoteReducer