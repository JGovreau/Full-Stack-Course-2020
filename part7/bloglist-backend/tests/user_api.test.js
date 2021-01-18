const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const { initialUsers } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of initialUsers) {
    await api
      .post('/api/users')
      .send({ ...user, password: user.username })
  }
})

test('user creation post with invalid user details fails', async () => {
  const userToCreate = new User({
    username: "j",
    name: "jordan",
    password: "jordan"
  })
  
  await api
    .post('/api/users')
    .send(userToCreate)
    .expect(400)

  const response = await api.get('/api/users')

  expect(response.body).toHaveLength(initialUsers.length)
})


afterAll(() => {
  mongoose.connection.close()
})