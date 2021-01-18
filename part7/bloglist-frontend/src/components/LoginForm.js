import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()


  // Function called with Login is clicked
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      // Login using the redux store action creator
      dispatch(loginUser({ username, password }))

      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({target}) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({target}) => setPassword(target.value)}
          />
      </div>
      <button id="loginButton" type="submit">Login</button>
    </form>
  )
}

export default LoginForm