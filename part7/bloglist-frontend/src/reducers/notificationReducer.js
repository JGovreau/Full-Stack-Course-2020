
const notificationReducer = (state = { message: '' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data

    case 'CLEAR_NOTIFICATION':
      return { message: '' }

    default:
        return state
  }
}

let timeout

export const setNotification = (message, isError, seconds) => {
  return async dispatch => {

    // Clear timeout in case a notification already exists
    clearTimeout(timeout)

    // Set notification message
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, isError }
    })

    // Clear notification after specified number of seconds
    timeout = setTimeout(() => dispatch({
        type: 'CLEAR_NOTIFICATION'
      }),
      seconds*1000
    )
  }
}

export default notificationReducer