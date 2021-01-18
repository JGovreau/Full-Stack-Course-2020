import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {

    // Get all users from the user service
    const users = await userService.getAll()

    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}


export default userReducer