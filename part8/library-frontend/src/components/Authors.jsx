import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from "../../queries";
import { useState } from 'react';


const Authors = ({ show }) => {
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');

  const [ updateBirthYear ] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  });

  const result = useQuery(ALL_AUTHORS);
  console.log(result);

  const submit = async (event) => {
    event.preventDefault()

    updateBirthYear({ variables: { name, "setBornTo": birthYear }})
    setName('');
    setBirthYear('');
  };

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          { result?.data?.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <h2>set birth year</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          birth year
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(parseInt(target.value))}
          />
        </div>
        <button type="submit">update birth year</button>
      </form>
    </div>
  )
}

export default Authors
