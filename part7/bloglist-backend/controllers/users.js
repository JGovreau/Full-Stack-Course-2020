const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(user => user.toJSON()))
})


usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password === undefined) {
    response.status(400).json({ error: "content missing" })
  } 
  
  if (body.password.length < 3) {
    response.status(400).json({ error: "password must be at least three characters in length" })
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: hashedPassword
  })

  const savedUser = await newUser.save()
  response.json(savedUser)
})


module.exports = usersRouter