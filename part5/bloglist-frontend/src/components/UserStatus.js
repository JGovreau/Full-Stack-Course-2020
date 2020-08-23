import React from 'react'

const UserStatus = ({user, setUser}) => {
  
  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  return (
    <div>
      <p>
      Logged in as: {user.name}
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
      </p>
    </div>
  )
}

export default UserStatus