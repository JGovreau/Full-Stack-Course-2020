import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      // Return user info for the current session
      return action.data

    case 'LOGOUT_USER':
      return null

    default:
      return state
  }
}


// Action creator for logging in
export const loginUser = (credentials) => {
  return async dispatch => {

    // Login using the login service
    const user = await loginService.login(credentials)

    // Set user in browser cache
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    // Set user login token
    blogService.setToken(user.token)

    dispatch({
      type: 'SET_SESSION',
      data: user
    })
  }
}

// Action creator for continuing sesson when user is already logged in
export const continueSession = (user) => {
  return async dispatch => {

    // Set user login token
    blogService.setToken(user.token)

    dispatch({
      type: 'SET_SESSION',
      data: user
    })
  }
}

// Action creator for loggin out
export const logoutUser = () => {
  return async dispatch => {

    // Remove user from browser cache
    window.localStorage.removeItem('loggedInUser')

    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}


export default loginReducer