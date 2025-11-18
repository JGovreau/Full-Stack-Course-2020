import { useState } from 'react'
import { useMutation } from '@apollo/client'
import * as queries from '../queries';
import ErrorMessage from './ErrorMessage';
import { updateCache } from '../App';

const PersonForm = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // const notifyError = (message) => {
  //   setErrorMessage(message)
  //   setTimeout(() => {
  //     setErrorMessage(null)
  //   }, 10000)
  // };

  const [ createPerson ] = useMutation(queries.CREATE_PERSON, {
    // refetchQueries: [{ query: queries.ALL_PERSONS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setErrorMessage(messages);
      // notifyError(messages);
    },
    update: (cache, response) => {
      updateCache(cache, response.data.addPerson);
      // cache.updateQuery({ query: queries.ALL_PERSONS }, ({ allPersons }) => {
      //   return { allPersons: allPersons.concat(response.data.addPerson) };
      // });
    }
  });

  const submit = (event) => {
    event.preventDefault()


    createPerson({  variables: { name, street, city, phone: phone.length > 0 ? phone : null } })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
      { errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
      {/* <Notify errorMessage={errorMessage} /> */}
    </div>
  )
}

// const Notify = ({errorMessage}) => {
//   if ( !errorMessage ) {
//     return null
//   }
//   return (
//     <div style={{color: 'red'}}>
//       {errorMessage}
//     </div>
//   )
// }

export default PersonForm
