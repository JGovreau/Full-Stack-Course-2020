const express = require("express")
var morgan = require('morgan')
var fs = require('fs')
var path = require('path')
const app = express()

app.use(express.json())


// Custom Morgan POST body logger
morgan.token('post-data', (request, reponse) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body)
  }
})

// Setup the Morgan logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data' ))


let persons = [ 
  {
    name: "Arto Hellas",
    phone: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    phone: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    phone: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
    id: 4
  }
]


// Get persons API info
app.get('/info', (request, response) => {
  const date = new Date()
  const totalPeople = persons.length

  response.send("<p>Phonebook has information for " + totalPeople + " people.</p><p>" + date + "</p>")
})


// Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})


// Get person by id
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = persons.find(person => person.id === id)

  person
    ? response.json(person)
    : response.status(404).end()
})


// Delete person by id
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})


// Generate random id
function getId() {
  min = Math.ceil(0);
  max = Math.floor(10000);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Post new person
app.post('/api/persons/', (request, response) => {
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

  // If provided name already exists
  else if (persons.filter(person => person.name === body.name).length > 0) {
    return response.status(400).json({
      error: 'person already exists'
    })
  }

  const person = {
    name: body.name,
    phone: body.phone,
    id: getId()
  }

  persons = persons.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})