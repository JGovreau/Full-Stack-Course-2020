import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'


const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    }
    catch (exception) {
      console.log(exception)
      /*setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
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