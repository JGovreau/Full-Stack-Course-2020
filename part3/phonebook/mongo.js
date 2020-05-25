const mongoose = require('mongoose')

const addPerson = (name, phone) => {
  const person = new Person({
    name: name,
    phone: phone
  })
  
  person.save().then(result => {
    console.log(`Added person!`)
    mongoose.connection.close()
  })
}

const displayPeople = () => {
  console.log("Phonebook:")
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.phone}`)
    })
    mongoose.connection.close()
  })
}

const args = process.argv
const numArgs = args.length

if (numArgs !== 3 && numArgs !== 5) {
  console.log('Usage: node mongo.js <password> <name> <phone>')
  process.exit(1)
}

const password = args[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-m8rz4.mongodb.net/test-phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Person = mongoose.model('Person', personSchema)

if (numArgs === 3) { displayPeople() }
if (numArgs === 5) { addPerson(args[3], args[4]) }