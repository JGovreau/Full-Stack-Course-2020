import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Person from './Person'
import PersonForm from './PersonForm'
import * as queries from '../queries';
import PhoneForm from './PhoneForm';

const Persons = ({ persons }) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(queries.FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })

  if (nameToSearch && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClose={() => setNameToSearch(null)}
      />
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>
            show address
          </button>
        </div>
      ))}
      <br/>
      <PersonForm />
      <br/>
      <PhoneForm />
    </div>
  )
}

export default Persons
