import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingAnimation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
      }}
    >
      <CircularProgress />
      <Typography sx={{ mt: 2 }}>Generating news...</Typography>
    </Box>
  );
};

export default LoadingAnimation;
