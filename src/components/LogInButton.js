import React from 'react'
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react'

const LogInButton = ({ toAuthPage }) => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button sx={{ bgcolor: "#990000", height: 75, width: 500, fontSize: 20 }} variant="contained" onClick={() => loginWithRedirect({
            appState: {
                returnTo: toAuthPage ? '/signin' : null
            }
        })}>
            Log in or create an account here
        </Button>
    )
}

export default LogInButton