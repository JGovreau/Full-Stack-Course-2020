import { useQuery } from '@apollo/client'
import Persons from './components/Persons'
import * as queries from './queries';

const App = () => {
  const result = useQuery(queries.ALL_PERSONS)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons}/>
    </div>
  )
}

export default App