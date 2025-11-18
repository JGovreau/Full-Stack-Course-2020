import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { useState } from 'react';
import Persons from './components/Persons';
import * as queries from './queries.js';
import LoginForm from './components/LoginForm';

// function that takes care of manipulating cache
export const updateCache = (cache, addedPerson) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery({ query: queries.ALL_PERSONS }, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson))
    };
  });
}

const App = () => {
    const [token, setToken] = useState(null);
    const result = useQuery(queries.ALL_PERSONS);
    const client = useApolloClient();

    useSubscription(queries.PERSON_ADDED, {
        onData: ({ data, client }) => {
            console.log(data);
            updateCache(client.cache, data.data.personAdded);
        }
    });


    if (result.loading) {
        return <div>loading...</div>;
    }

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    };

    if (!token) {
        return (
            <div>
                <h2>Login</h2>
                <LoginForm setToken={setToken} />
            </div>
        );
    }

    return (
        <div>
            <button onClick={logout}>logout</button>
            <Persons persons={result.data.allPersons}/>
        </div>
    );
}

export default App;
