import React, { useState, useEffect } from 'react'
import personService from './services/persons'


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

const Notification = ({ message }) => {
  if (message === null) { return null }
  
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) { return null }
  
  return (
    <div className="error">
      {message}
    </div>
  )
}

const Persons = ({ filteredPersonsArray, handleDelete}) => {
  return (
    <div>
      {filteredPersonsArray.map((person) =>
        <div key={person.name}>
          {person.name} {person.phone} 
          <button onClick={() => handleDelete(person)}>Delete</button>
        </div>
      )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('') // New name input box state
  const [ newPhone, setNewPhone ] = useState('') // New Phone input box state
  const [ searchString, setSearchString] = useState('') // Filter input box state
  const [ notification, setNotification ] = useState(null)
  const [ error, setError ] = useState(null)

  // Filtered persons array state
  const [ filteredPersons, setFilteredPersons ] = useState(persons)

  const hook = () => {
    personService
      .getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }

  // Get persons data from the server
  useEffect(hook, [])


  const notify = (message, isError) => {
    if (isError) { setError(message) }
    else { setNotification(message) }
    //setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

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
    
    // Check if newPerson already exists in the persons array
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        const result = window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)
        
        // If approved, update the person's number
        if (result) {
          // Create new person object from existing and replace the number
          const updatedPerson = {...persons[i], phone: newPhone}

          // Update the person on the backend server
          personService
            .updatePerson(persons[i].id, updatedPerson)
            .then(responseUpdatedPerson => {
              persons[i] = responseUpdatedPerson
              setPersons(persons)
              setFilteredPersons(persons)
              setSearchString('')
              setNewName('')
              setNewPhone('')
              notify(`Updated ${newName}'s phone number to ${newPhone}`, false)
            })
            .catch(error => {
              notify(`Information of ${updatedPerson.name} has already been removed from the server`, true)
            })
        }

        return
      }
    }

    
    // Create new person object
    const newPerson = { name: newName, phone: newPhone }


    // Save new person to the backend server
    personService
      .createPerson(newPerson)
      .then(personToAdd => {
        setPersons(persons.concat(personToAdd))
        setFilteredPersons(persons.concat(personToAdd))
        setSearchString('')
        setNewName('')
        setNewPhone('')
        notify(`Added ${personToAdd.name}`, false)
      })
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

  // Handle delete logic
  const handleDelete = (deletedPerson) => {
    //?? axios delete response doesn't include any data from the deleted object
    //?? I need to do removal logic against the deletedPerson object rather than response data
    personService
      .deletePerson(deletedPerson.id)
      .then(response => {
        const newPersons = persons.filter(p => p.id !== deletedPerson.id) // Removal logic with deletedPerson object
        setPersons(newPersons)
        setFilteredPersons(newPersons)
        setSearchString('')
        setNewName('')
        setNewPhone('')
        notify(`Deleted ${deletedPerson.name}`, false)
      })
      .catch(error => {
        notify(`Failed to delete ${deletedPerson.name} with ID ${deletedPerson.id}.`, true)
      })
  }

  return (
    <div>
        <h2>Phonebook</h2>
        <Notification message={notification} />
        <Error message={error} />
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
        <Persons filteredPersonsArray={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App