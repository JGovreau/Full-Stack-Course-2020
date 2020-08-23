import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import UserStatus from './components/UserStatus'
import blogService from './services/blogs'

const Notification = ({ notification }) => {
  return notification.isError === true
    ? (<div className="error">{notification.message}</div>)
    : (<div className="notification">{notification.message}</div>)
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedInUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {notification === null
        ? <div></div>
        : <Notification notification={notification} />
      }
      
      {user === null
      ? <LoginForm setUser={setUser} />
      : <div>
          <h2>blogs</h2>
          <UserStatus user={user} setUser={setUser} setNotification={setNotification} />
          <BlogCreationForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
          <br/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App