const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned in the correct JSON format', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog unique identifier is named "id"', async () => {
  const response = await api.get('/api/blogs')

  console.log(response.body)

  expect(response.body[0].id).toBeDefined()
})

test('new blogs can be posted successfully', async () => {
  const blogToAdd = {
    title: "Test Post Blog",
    author:"Test",
    url: "test.com",
    likes: 69420
  }
  
  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogTitles = response.body.map(blog => blog.title)

  expect(blogTitles).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogTitles).toContain("Test Post Blog")
})

test('default likes value is 0', async () => {
  const blogToAdd = {
    title: "Test Post Blog",
    author:"Test",
    url: "test.com"
  }

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const blogs = response.body

  expect(blogs[blogs.length - 1].likes).toBe(0)
})

test('POST with no URL fails with 400 Bad Request', async () => {
  const noUrlBlog = {
    title: "No URL Provided Error",
    author: "Post"
  }

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)
})

test('POST with no title fails with 400 Bad Request', async () => {
  const noTitleBlog = {
    author: "Post",
    url: "no-title.com"
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)
})

test('delete succeeds when existing ID is provided', async () => {
  const response = await api.get('/api/blogs')
  const blogToDelete = response.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAfterDeletion = await api.get('/api/blogs')
  const titles = blogsAfterDeletion.body.map(blog => blog.title)

  expect(titles.length).toBe(1)
  expect(titles).not.toContain(blogToDelete.title)
})

test('put successfully updates number of likes if provided ID exists', async () => {
  const response = await api.get('/api/blogs')
  const blogToUpdate = response.body[0]

  const newBlog = { ...blogToUpdate, "likes": blogToUpdate.likes + 1 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
  
    const newResponse = await api.get('/api/blogs')
    const updatedBlog = newResponse.body[0]

    expect(updatedBlog.likes).toBe(blogToUpdate.likes + 1)
  
})


afterAll(() => {
  mongoose.connection.close()
})