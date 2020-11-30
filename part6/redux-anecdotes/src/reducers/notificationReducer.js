
const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data

    case 'CLEAR_NOTIFICATION':
      return ''

    default:
      return state
  }
}

let timeout

export const setNotification = (message, seconds) => {
  return async dispatch => {

    clearTimeout(timeout)
    
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })

    timeout = setTimeout(() => dispatch({
        type: 'CLEAR_NOTIFICATION'
      }),
      seconds*1000
    )
  }
}


export default notificationReducer