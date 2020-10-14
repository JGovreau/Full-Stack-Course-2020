import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [infoIsVisible, setInfoVisibility] = useState(false)
  const [blogState, setBlog] = useState(blog)

  const toggleVisibility = () => {
    setInfoVisibility(!infoIsVisible)
  }

  const handleLike = async () => {
    const response = await blogService.incrementLikes(blogState)
    setBlog({...blogState, likes: response.likes})
  }

  const handleDeletion = async () => {
    if (window.confirm(`Delete blog: "${blogState.title}"?`)) { 
      await blogService.deleteBlog(blogState.id)
      setBlogs(blogs.filter(b => b.id !== blogState.id))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      {blogState.title}
      <button onClick={toggleVisibility}>View</button>
      {infoIsVisible === true
        ? <div>
            <div>{blogState.url}</div>
            <div>
              Likes: {blogState.likes}
              <button onClick={handleLike}>Like</button>
            </div>
            <div>{blogState.author}</div>
            <div>
              <button onClick={handleDeletion}>Delete</button>
            </div>
          </div>
        : <div></div>
      }
    </div>
  )

}

export default Blog
