const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


// Post a new blog
blogsRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes
  })


  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(200).json(savedBlog)
})


// Delete a blog by ID
blogsRouter.delete('/:id', async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) { 
    response.status(401).json({ error: 'missing or invalid token' })
  }

  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === decodedToken.id) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else { 
    response.status(401).json({ error: 'permissions error' })
  }

})


// Update numbers of likes on a blog by ID
blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
  response.status(200).end()
})

module.exports = blogsRouter