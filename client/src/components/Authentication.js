import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { redirect, useNavigate } from 'react-router-dom';
import LogInButton from './LogInButton';
import axios from 'axios';

const Authentication = () => {
    const { isAuthenticated, user } = useAuth0();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
            const exec = async () => {
                const res = await axios.post('http://localhost:8000/signin', user);

            }
            exec();
        }
    }, [isAuthenticated])

    return (
        <main className='min-h-screen min-w-screen flex justify-center items-center'>
            {!isAuthenticated ? (
                <div className="flex flex-col gap-5 items-center">
                    <LogInButton />
                    <p>or</p>
                </div>
            ) : success ? (
                <div className="bg-green-200 flex flex-col items-center rounded-lg p-10" >
                    <p className="text-3xl">Confirmation successful</p>
                    <p>Signed in at</p>
                </div>
            ) : (<div className="bg-red-200 flex flex-col items-center rounded-lg p-10" >
                <p className="text-3xl">Failure</p>
                <p>Signed in at</p>
            </div>)
            }
        </main >
    )
}

export default Authentication