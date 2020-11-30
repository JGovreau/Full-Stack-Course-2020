import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'

import { incrementAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  // const anecdotes = useSelector(state => {
  //   return state.filter === null
  //     ? state.anecdotes
  //     : state.anecdotes.filter(a => a.content.includes(state.filter))
    
  // })

  // const dispatch = useDispatch()

  const vote = async (id, content) => {
    //dispatch(incrementAnecdote(id))
    props.incrementAnecdote(id)

    // Notification logic
    //dispatch(setNotification(`Voted: ${content}`, 5))
    props.setNotification(`Voted: ${content}`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: (
      state.filter === null
        ? state.anecdotes
        : state.anecdotes.filter(a => a.content.includes(state.filter))
    )
  }
}

const mapDispatchToProps = {
  incrementAnecdote,
  setNotification
}

const ConnectedAnecdoteList = connect (
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList