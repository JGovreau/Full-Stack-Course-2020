
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

function sleep(s) {
  return new Promise(resolve => setTimeout(resolve, s*1000));
}

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: message
    })

    await sleep(seconds)

    dispatch({
      type: 'CLEAR_NOTIFICATION'
    })
  }
}


export default notificationReducer