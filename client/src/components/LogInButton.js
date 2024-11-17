import React from 'react'
import { Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react'

const LogInButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button sx={{ bgcolor: "#990000" }} variant="contained" onClick={() => loginWithRedirect()}>
            Log in or create an account here
        </Button>
    )
}

export default LogInButton