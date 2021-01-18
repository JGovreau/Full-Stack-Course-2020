import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'

const UserStatus = () => {
  
  const dispatch = useDispatch()

  // Get user from redux store
  const loggedInUser = useSelector(state => state.loggedInUser)

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <p>
      Logged in as: {loggedInUser.name}
      <Button variant="secondary" type="button" onClick={handleLogout}>
        Logout
      </Button>
      </p>
    </div>
  )
}

export default UserStatus