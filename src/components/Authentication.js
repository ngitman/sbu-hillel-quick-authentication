import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { redirect, useNavigate } from 'react-router-dom';
import GuestForm from './GuestForm';
import LogInButton from './LogInButton';
import axios from 'axios';
import moment from 'moment';

const Authentication = () => {
    const { isAuthenticated, user } = useAuth0();
    const [response, setResponse] = useState(false);
    const [code, setCode] = useState(0);

    useEffect(() => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
            const exec = async () => {
                const res = await axios.post('http://localhost:8000/signin', user);
            }
            exec();
        }
    }, [isAuthenticated])

    const openingTime = moment('08:00 AM', 'hh:mm A');
    const closingTime = moment('08:00 PM', 'hh:mm A');
    const timeDate = new Date();
    if (!moment().isBetween(openingTime, closingTime) && (timeDate.getDay() > 0 && timeDate.getDay() < 6)) {
        return (
            <main className='min-h-screen bg-red-200'>
                <div className='flex flex-col gap-3 p-5 items-center justify-center'>
                    <h2 className='text-3xl'>It appears that the Hillel lounge is closed right now...</h2>
                    <h3 className='text-xl'>Please come back tomorrow.</h3>
                    <p>Hours: 8:00 AM to 8:00 PM M-F (except holidays)</p>
                </div>
            </main>
            
        )
    }
    return (
        <main className='min-h-screen min-w-screen flex justify-center items-center flex-col gap-5'>
            <h1 className='text-4xl font-bold mb-10'>Gloria and Mark Snyder Hillel Center (SBU Hillel) Quick Sign-In System</h1>
            {!isAuthenticated && !response ? (
                <div className="flex flex-col gap-5 items-center">
                    <LogInButton toAuthPage={true}/>
                    <p>or</p>
                    <GuestForm setResponse={setResponse} setCode={setCode}/>
                </div>
            ) : (code > 0 && code < 400) ? (
                <div className="bg-green-200 flex flex-col items-center rounded-lg p-10" >
                    <p className="text-3xl">Confirmation successful</p>
                    <p>Signed in at {Date.now()}</p>
                    <p>Please show this code to the receptionist.</p> 
                </div>
            ) : (<div className="bg-red-200 flex flex-col items-center rounded-lg p-10" >
                <p className="text-3xl">Failure</p>
                <p>Please try again.</p>
            </div>)
            }
        </main >
    )
}

export default Authentication