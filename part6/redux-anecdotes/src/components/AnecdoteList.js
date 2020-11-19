import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.filter === null
      ? state.anecdotes
      : state.anecdotes.filter(a => a.content.includes(state.filter))
    
  })

  const dispatch = useDispatch()

  const vote = async (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`Voted: ${content}`))
    await sleep(5000)
    dispatch(clearNotification())
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
          <hr></hr>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList