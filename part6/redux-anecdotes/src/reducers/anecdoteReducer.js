const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
const intitialStateOrdered = initialState.sort((a,b) => 
  (a.votes > b.votes) ? -1 : ((b.votes > a.votes) ? 1 : 0)
)

const reducer = (state = intitialStateOrdered, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [ ...state, action.data]

    case 'VOTE_ANECDOTE':
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

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer