import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
  //const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    // Update the frontend with the new anecdote information
    // dispatch(newAnecdote(content))
    props.newAnecdote(content)

    // Notification logic
    // dispatch(setNotification(`Created anecdote: ${content}`, 5))
    props.setNotification(content)

  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    newAnecdote: value =>
      dispatch(newAnecdote(value)),
    setNotification: value =>
      dispatch(setNotification(`Created anecdote: ${value}`, 5))
  }
}

// export default AnecdoteForm
export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)