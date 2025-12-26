import { useEffect } from 'react';
import Text from './Text';
import useSignOut from '../hooks/useSignOut';
import { useNavigate } from 'react-router-native';

const SignOut = () => {
    const [signOut] = useSignOut();
    const navigate = useNavigate();

    useEffect(() => {

        const executeSignOut = async () => {
            await signOut();
            navigate('/signin');
        };
        setTimeout(async () => {
            await executeSignOut();
        }, 2000);
    }, []);

    return (
        <Text>Signing Out...</Text>
    );
};

export default SignOut;
