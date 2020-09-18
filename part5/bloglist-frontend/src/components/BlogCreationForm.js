import React, { useState } from 'react'
import BlogService from '../services/blogs'

const BlogCreationForm = ({ blogs, setBlogs, setNotification, blogCreationFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()

    try {
      const blog = await BlogService.create({title, author, url})

      // Toggle Blog Creation Form Visibility
      blogCreationFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')

      // Notify successful blog creation
      setNotification({ message: `Successfully created blog "${blog.title}"`, isError: false })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification({ message: `Error Creating Blog`, isError: true })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleCreation}>
      <div>
        Title: 
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        Author: 
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL: 
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogCreationForm