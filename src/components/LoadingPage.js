import React from 'react'
import { Box, CircularProgress } from '@mui/material';

const LoadingPage = ({ isLoading }) => {
    return (
        <Box className="min-h-screen min-w-screen">
            <CircularProgress />
        </Box>
    )
}

export default LoadingPage