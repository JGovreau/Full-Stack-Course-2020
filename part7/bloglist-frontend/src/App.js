import React, { useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import UserStatus from './components/UserStatus'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import Blog from './components/Blog'

import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { continueSession } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

import { Navbar, Nav } from 'react-bootstrap'


const App = () => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  // Initialize the blogs using the blog reducer
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Initialize the users using the user reducer
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])
  
  // Get logged in user from redux store
  const loggedInUser = useSelector(state => state.loggedInUser)

  // Get notification from redux store
  const notification = useSelector(state => state.notification)

  // On initial render, check local storage to see if a user is logged in
  useEffect(() => {

    // Get logged in user info from cache
    const userJSON = window.localStorage.getItem('loggedInUser')

    // If user exists in catche, set the session using the user redux store
    if (userJSON) {
      dispatch(continueSession(JSON.parse(userJSON)))
    }
  }, [dispatch])

  const blogCreationFormRef = useRef()

  // Parameterization for user ID
  const userMatch = useRouteMatch('/users/:id')
  const user = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  // Parameterization for blog ID
  const blogMatch = useRouteMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find(b => b.id === blogMatch.params.id)
    : null

    // Nav bar padding
    const padding = {
      padding: 5
    }

  return (
    <div className="container">
      {notification.message === '' // Render notification component only if notification is set
        ? <div></div>
        : <Notification notification={notification} />
      }
      
      {loggedInUser === null
      ? <LoginForm />
      : <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">Home</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/users">Users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <UserStatus />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <h2>Blogs</h2>
          <Switch>
            <Route path='/blogs/:id'>
              <Blog blog={blog} />
            </Route>
            <Route path='/users/:id'>
              <User user={user} />
            </Route>
            <Route path='/users'>
              <UserList users={users} />
            </Route>
            <Route path='/'>
              <Togglable buttonLabel="Add Blog" ref={blogCreationFormRef}>
                <BlogCreationForm blogCreationFormRef={blogCreationFormRef} />
              </Togglable>
              <br/>
              <BlogList users={users} />
              </Route>
          </Switch>

        </div>
      }
    </div>
  )
}

export default App