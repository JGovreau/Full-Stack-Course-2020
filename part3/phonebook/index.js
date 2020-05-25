require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const Person = require('./models/person')

const cors = require('cors')
app.use(express.json())
app.use(express.static('build'))
app.use(cors())


// Custom Morgan POST body logger
morgan.token('post-data', (request, response) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})

// Setup the Morgan logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data' ))


// Get persons API info
app.get('/info', (request, response) => {
  const date = new Date()

  Person
    .countDocuments({}, (error, count) => count)
    .then(count => {
      response.send('<p>Phonebook has information for ' + count + ' people.</p><p>' + date + '</p>')
    })
})


// Get all persons
app.get('/api/persons', (request, response) => {
  Person
    .find({})
    .then(people => response.json(people))
})


// Get person by id
app.get('/api/persons/:id', (request, response, next) => {
  Person
    .findById(request.params.id)
    .then(person => {
      if (person) { response.json(person) }
      else { response.status(404).end() }
    })
    .catch(error => next(error))
})


// Delete person by id
app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndRemove(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
})


// Post new person
app.post('/api/persons/', (request, response, next) => {
  const body = request.body

  // If name is not provided
  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  // If phone number is not provided
  else if (!body.phone) {
    return response.status(400).json({
      error: 'phone missing'
    })
  }

  const person = new Person({
    name: body.name,
    phone: body.phone
  })

  person
    .save()
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error))
})


// Update person
app.put('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndUpdate(request.params.id, request.body,
      { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => response.json(updatedPerson))
    .catch(error => next(error))
})


// Error Handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})