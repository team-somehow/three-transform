import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { FaGoogle } from 'react-icons/fa';
import { useSignInWithGoogle, useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import axios from 'axios';

function GoogleLogin() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'https://3p-bff.oktostage.com/api/v1/wallet',
          {
            // Add any required data for the request body
          },
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2luZGN4X2lkIjoiZTZlZGZmNTEtNWJkZS00NDMyLWFiMDktZWNlODZlNzQ3Y2JmIiwidXNlcl9pZCI6ImU2ZWRmZjUxLTViZGUtNDQzMi1hYjA5LWVjZTg2ZTc0N2NiZiIsInNoYXJlZF9pZCI6bnVsbCwicG9ydGZvbGlvRmFjdG9yIjoiMSIsInNlc3Npb25JZCI6IjNiZWJlYzAxLWI5MjAtNDY2NC1iMDAwLTM5OWUyZjg1NzI1OSIsInVzZXJfbG9naW5fdmVuZG9yX2lkIjoiYmMzOTM3YTktYWQ3OS00NTMwLTg3ZGYtNTg5YjRiYzY3MjI1IiwicyI6Im9rdG9fYW5kcm9pZCIsInNpcCI6Ijo6ZmZmZjoxMjcuMC4wLjYiLCJvdiI6Im9rdG9fcGx1cyIsImxvZ2luX21lZGl1bSI6IkdfQVVUSCIsImlhdCI6MTcwMjEzODMxOSwiZXhwIjoxNzAzMDAyMzE5fQ.y_TcsP7wPl1U6wCltD40DAdwNUlxqoZNG6wd-iGvGoU', // Replace with your actual access token
              'x-api-key': '55d4c32e-2139-4690-8ef4-abfd75c73bdd',
            },
          }
        );

        console.log(response.data?.data);
        setWalletAddress(response.data?.data?.wallets[0]?.address);

        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.href = '/';
  };

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
          component={Link}
          to={`/editor`}
          variant="outlined"
          sx={{
            p: '0.5rem 3rem',
            borderRadius: 0.5,
          }}
        >
          Try without signing in!
        </Button>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& > .MuiBackdrop-root': {
            backdropFilter: 'blur(2px)',
          },
          '& > .MuiBox-root': {
            bgcolor: 'black', // Set the background color of the modal content
            color: 'white', // Set the text color if needed
            boxShadow: '0px 0px 60px 0px rgba(236, 39, 182, 0.60)',
          },
        }}
      >
        {/* Modal content */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" mb={2}>
            Successfully logged in to your account!
          </Typography>
          <Typography variant="body2" mb={2}>
            This is your wallet address:
          </Typography>
          <Typography variant="body2" mb={2} fontWeight={600}>
            {walletAddress}
          </Typography>
          <Button variant="contained" onClick={handleModalClose}>
            Let's Start
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default GoogleLogin;
