import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ value, eventHandler }) => {
  return (
    <div>
      filter shown with: <input value={value} onChange={eventHandler} />
    </div>
  )
}

const Form = ({newNameValue, newNameInput, newPhoneValue, newPhoneInput, newPersonHandler}) => {
    return (
      <form>
        <div>
          name: <input value={newNameValue} onChange={newNameInput}/>
          <br />
          number: <input value={newPhoneValue} onChange={newPhoneInput}/>
        </div>
        <div>
          <button type="submit" onClick={newPersonHandler}>add</button>
        </div>
      </form>
    )
}

const Persons = ({filteredPersonsArray}) => {
    return (
        <div>
            {filteredPersonsArray.map((person) =>
                <p key={person.name}>{person.name} {person.phone}</p>
            )}
        </div>
    )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('') // New name input box state
  const [ newPhone, setNewPhone ] = useState('') // New Phone input box state
  const [ searchString, setSearchString] = useState('') // Filter input box state

  // Filtered persons array state
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(response.data)
      })
  }

  // Get persons data from the server
  useEffect(hook, [])


  // Name input box event handler
  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }


  // Phone input box event handler
  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value)
  }


  // Form submission event handler
  const handleNewPerson = (event) => {
    event.preventDefault()

    // Check if both input fields are populated
    if (newName === '' || newPhone === '') {
        window.alert("Please enter a name and a number!")
        return
    }

    // New person object
    const newPerson = { name: newName, phone: newPhone }
    
    // Check if newPerson already exists in the persons array
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        window.alert(`${newName} is already added to the phonebook!`)
        return
      }
    }
  
    setPersons(persons.concat(newPerson))
    setFilteredPersons(persons.concat(newPerson))
    setSearchString('')
    setNewName('')
    setNewPhone('')
  }


  // Filter input event handler
  const handleSearchStringInput = (event) => {
      const currentSearchString = event.target.value
      setSearchString(currentSearchString)

      // Generate filtered list
      const tmpFilteredPersons = persons.filter(person => 
        person.name.toLowerCase().includes(currentSearchString.toLowerCase())
      )

      setFilteredPersons(tmpFilteredPersons)
  }


  return (
    <div>
        <h2>Phonebook</h2>
        <Filter value={searchString} eventHandler={handleSearchStringInput} />
        <h3>Add a new</h3>
        <Form 
            newNameValue={newName}
            newNameInput={handleNameInput}
            newPhoneValue={newPhone}
            newPhoneInput={handlePhoneInput}
            newPersonHandler={handleNewPerson}
        />
        <h2>Numbers</h2>
        <Persons filteredPersonsArray={filteredPersons} />
    </div>
  )
}

export default App