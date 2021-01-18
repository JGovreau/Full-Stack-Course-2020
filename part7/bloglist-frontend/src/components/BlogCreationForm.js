import React, { useState } from 'react'
import {useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, Form } from 'react-bootstrap'


const BlogCreationForm = ({ blogCreationFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  // Function called when Create button is clicked
  const handleCreation = async (event) => {
    event.preventDefault()

    try {

      // Try creating the blog using the blog reducer
      const blog = {title, author, url}
      dispatch(createBlog(blog))

      // Toggle Blog Creation Form Visibility
      blogCreationFormRef.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')

      // Notify successful blog creation
      dispatch(setNotification(`Successfully created blog "${blog.title}"`, false, 10))

    }
    catch (exception) {
      
      // Notify failed blog creation
      dispatch(setNotification(`Error Creating Blog`, true, 10))

    }
  }

  return (
    <Form onSubmit={handleCreation}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control 
          type="text"
          value={title}
          name="Title"
          id="Title"
          onChange={({target}) => setTitle(target.value)}
        />
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          value={author}
          name="Author"
          id="Author"
          onChange={({target}) => setAuthor(target.value)}
        />
        <Form.Label>URL</Form.Label>
        <Form.Control
          type="text"
          value={url}
          name="URL"
          id="URL"
          onChange={({target}) => setUrl(target.value)}
        />
        <Button variant="primary" id="createBlogButton" type="submit">Create</Button>
      </Form.Group>
    </Form>
  )
}

export default BlogCreationForm