import React, {useEffect} from 'react'
import LogInButton from './LogInButton';
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@mui/material';

const Body = () => {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    useEffect(() => {
        console.log(isAuthenticated);
    }, [])
    if (isAuthenticated) {
        return null;
    } else return (
        <section className='min-h-screen min-w-screen flex flex-col justify-center items-center gap-5'>
            <h1 className="text-3xl">You are not logged in.</h1>
            <h2 className="text-xl">Ensure you remain logged in on this device so you can continue to be signed in without having to constantly sign in.</h2>
            <LogInButton />
        </section>
    )
}

export default Body