import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import * as queries from '../../queries.js';
import ErrorMessage from './ErrorMessage.jsx';

const LoginForm = ({ setToken, show, setPage }) => {

    if (!show) { return null; }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const [login, result] = useMutation(queries.LOGIN, {
        onError: error => setErrorMessage(error.graphQLErrors[0].message)
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
    };

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token);
            setPage('authors');
        }
    }, [result.data]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                username <input
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                password <input
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <button type='submit'>login</button>
            </form>
            { errorMessage && <ErrorMessage errorMessage={errorMessage} setErrorMessage={setErrorMessage} />}
        </div>
    );
};

export default LoginForm;
