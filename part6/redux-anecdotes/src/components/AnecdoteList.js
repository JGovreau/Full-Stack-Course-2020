import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.filter === null
      ? state.anecdotes
      : state.anecdotes.filter(a => a.content.includes(state.filter))
    
  })

  const dispatch = useDispatch()

  const vote = async (id, content) => {
    dispatch(incrementAnecdote(id))

    // Notification logic
    dispatch(setNotification(`Voted: ${content}`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content} / {anecdote.id}
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