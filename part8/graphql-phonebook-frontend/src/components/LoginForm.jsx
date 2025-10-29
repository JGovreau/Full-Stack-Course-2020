import { useMutation } from '@apollo/client';
import { useState, useEffect } from 'react';
import * as queries from '../queries.js';
import ErrorMessage from './ErrorMessage';

const LoginForm = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const [login, result] = useMutation(queries.LOGIN, {
        onError: error => setErrorMessage(error.graphQLErrors[0]?.message || 'An error occurred')
    });

    const submit = (event) => {
        event.preventDefault();
        login({ variables: { username, password } });
    };

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('phonenumbers-user-token', token)
        }
    }, [result.data]);

    return (
        <div>
            <form onSubmit={submit}>
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
