const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const { initialUsers } = require('./test_helper')
//const usersRouter = require('../controllers/users')

const api = supertest(app)


const loginAndRetreiveToken = async (username, password) => {

  //console.log('username: ', username, 'password: ', password)
  const response = await api
    .post('/api/login')
    .send({ username: username, password: password })

  //console.log(response.body)
  return response.body.token
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (let user of initialUsers) {
    await api
      .post('/api/users')
      .send({ ...user, password: user.username })
  }

  const token = await loginAndRetreiveToken("root", "root")

  for (let blog of helper.initialBlogs) {
    await api
      .post('/api/blogs')
      .send(blog)
      .set({ authorization: 'bearer ' + token })
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

  expect(response.body[0].id).toBeDefined()
})

test('new blogs can be posted successfully', async () => {
  const blogToAdd = {
    title: "Test Post Blog",
    author:"Test",
    url: "test.com",
    likes: 69420
  }

  const token = await loginAndRetreiveToken("root", "root")
  
  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .set({ Authorization: "bearer " + token })
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

  const token = await loginAndRetreiveToken("root", "root")

  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .set({ Authorization: "bearer " + token })
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

  const token = await loginAndRetreiveToken("root", "root")

  await api
    .post('/api/blogs')
    .set({ Authorization: "bearer " + token })
    .send(noUrlBlog)
    .expect(400)
})

test('POST with no title fails with 400 Bad Request', async () => {
  const noTitleBlog = {
    author: "Post",
    url: "no-title.com"
  }

  const token = await loginAndRetreiveToken("root", "root")

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .set({ Authorization: "bearer " + token })
    .expect(400)
})

test('DELETE succeeds when existing ID is provided', async () => {
  const response = await api.get('/api/blogs')
  const blogToDelete = response.body[0]

  const token = await loginAndRetreiveToken("root", "root")

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set({ Authorization: "bearer " + token })
    .expect(204)
  
  const blogsAfterDeletion = await api.get('/api/blogs')
  const titles = blogsAfterDeletion.body.map(blog => blog.title)

  expect(titles.length).toBe(1)
  expect(titles).not.toContain(blogToDelete.title)
})

test('PUT successfully updates number of likes if provided ID exists', async () => {
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

test('POST fails when a token isnt provided', async () => {
  const blogToAdd = {
    title: "Test Post Blog",
    author:"Test",
    url: "test.com",
    likes: 69420
  }
  
  await api
    .post('/api/blogs')
    .send(blogToAdd)
    .expect(401)

  })


afterAll(() => {
  mongoose.connection.close()
})