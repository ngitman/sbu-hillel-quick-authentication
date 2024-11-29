import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const { user, isLoading, isAuthenticated, loginWithRedirect } = useAuth0();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#f7f7f7' }}>
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" color='primary' component="div" sx={{ flexGrow: 1 }}>
                        Stony Brook Hillel
                    </Typography>
                    {isAuthenticated ? (
                        <Button
                            color="primary"
                            sx={{ fontSize: "20px" }}
                            onClick={() => loginWithRedirect()}
                        >
                            Sign Out
                        </Button>
                    ) : (
                        <Button
                            color="primary"
                            sx={{ fontSize: "20px" }}
                            onClick={() => loginWithRedirect()}
                        >
                            Login
                        </Button>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header