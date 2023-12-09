import React from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { FaGoogle } from 'react-icons/fa';
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

function GoogleLogin() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (user) {
    return (
      <div>
        <p>Signed In User:</p>
        {console.log(user)}
      </div>
    );
  }
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        width: '100vw',
        background: 'black',
        flexDirection: 'column',
      }}
    >
      <img
        src="logo.svg"
        alt="text"
        style={{
          display: 'block',
          width: '200px',
          position: 'absolute',
          top: '3rem',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 5,
        }}
      >
        <Typography variant="h4" fontWeight={500}>
          Sign in to
        </Typography>
        <Typography variant="h4" fontWeight={600}>
          3-Tranform
        </Typography>
        <Typography variant="body" fontWeight={500} mb={2}>
          Use your Google Account
        </Typography>
        <Button
          variant="contained"
          startIcon={<FaGoogle />}
          sx={{
            p: '0.5rem 3rem',
            borderRadius: 0.5,
          }}
          onClick={() => signInWithGoogle()}
        >
          Sign in with Google
        </Button>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'coloumn',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Divider
            sx={{ bgcolor: 'white', width: '30%', height: '1px' }}
          ></Divider>
          <Typography variant="body2" fontSize={18} px={1}>
            OR
          </Typography>
          <Divider
            sx={{ bgcolor: 'white', width: '30%', height: '1px' }}
          ></Divider>
        </Box>
        <Button
          variant="outlined"
          sx={{
            p: '0.5rem 3rem',
            borderRadius: 0.5,
          }}
        >
          Try without signing in!
        </Button>
      </Box>
    </Box>
  );
}

export default GoogleLogin;
