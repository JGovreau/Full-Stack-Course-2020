import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import UserStatus from './components/UserStatus'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

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
      //setBlogs( blogs )
      setBlogs(blogs
        .sort(
          (a,b) => (a.likes > b.likes) ? -1 : ((b.likes > a.likes) ? 1 : 0)
        )
      )
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

  const blogCreationFormRef = useRef()

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
          <Togglable buttonLabel="Add Note" ref={blogCreationFormRef}>
            <BlogCreationForm 
              blogs={blogs}
              setBlogs={setBlogs}
              setNotification={setNotification}
              blogCreationFormRef={blogCreationFormRef}
            />
          </Togglable>
          <br/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
          )}
        </div>
      }
    </div>
  )
}

export default App