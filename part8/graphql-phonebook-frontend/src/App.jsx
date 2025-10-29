import { useQuery, useApolloClient } from '@apollo/client';
import { useState } from 'react';
import Persons from './components/Persons';
import * as queries from './queries.js';
import LoginForm from './components/LoginForm';

const App = () => {
    const [token, setToken] = useState(null);
    const result = useQuery(queries.ALL_PERSONS);
    const client = useApolloClient();

    if (result.loading)  {
        return <div>loading...</div>;
    }

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    }

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
