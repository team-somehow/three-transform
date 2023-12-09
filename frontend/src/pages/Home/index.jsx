import React, { useEffect, useState } from 'react';
import {
  Box,
  CardActions,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import { FaMagic } from 'react-icons/fa';
import BottomCard from '../../components/BottomCard';
import GradientButton from '../../components/GradientButton';
import LinkInput from '../../components/LinkInput';

const steps = [
  {
    id: 1,
    text: 'Share your website URL.',
  },
  {
    id: 2,
    text: 'Receive tailored suggestions on integrating web3 seamlessly.',
  },
  {
    id: 3,
    text: 'Get a one-click deploy contract for swift implementation.',
  },
];

function Home() {
  const [inputLink, setInputLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicButtonClick = () => {
    // Set loading state to true when the button is clicked
    setLoading(true);

    // Simulate an asynchronous operation (API call, etc.)
    setTimeout(() => {
      // Reset loading state after the operation is completed
      setLoading(false);
    }, 2000); // You can replace this with your actual asynchronous operation
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      width="80%"
      mx="auto"
      height="calc(100vh - 4rem)"
    >
      <Box width="60%" mx="auto" pt={4} mb={3}>
        <LinkInput onChange={(e) => setInputLink(e.target.value)} />
        <Typography align="center" variant="body1">
          Streamlined web3 integration made simple!
        </Typography>
      </Box>
      <BottomCard
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          borderRadius: '2rem',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            height: '33rem',
            borderRadius: '2rem',
            opacity: loading ? 0 : 1, // Set opacity based on the loading state
            transition: 'opacity 1s ease-in-out', // Add a smooth transition effect
          }}
        >
          {loading ? (
            <>
              <Typography variant="h6" mb={2} fontWeight={700} align="center">
                Generating ideas!
              </Typography>
              <LinearProgress
                sx={{ width: '30%', borderRadius: '1rem', mt: 2 }}
              />
            </>
          ) : (
            <>
              <Typography
                variant="h2"
                mt={2}
                mb={5}
                fontWeight={700}
                align="center"
              >
                Three Simple Steps!
              </Typography>
              <List sx={{ listStyleType: 'number' }}>
                {steps.map(({ id, text }) => (
                  <ListItem key={id} sx={{ display: 'list-item' }}>
                    <Typography variant="h5" fontWeight={500}>
                      {text}
                    </Typography>
                  </ListItem>
                ))}
              </List>
              <CardActions
                sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}
              >
                <GradientButton
                  icon={<FaMagic />}
                  text="Start the Magic!"
                  onClick={handleMagicButtonClick}
                  disabled={loading}
                />
                <Box sx={{ display: 'flex' }}>
                  <img
                    src="creditIcon.svg"
                    alt="text"
                    style={{
                      display: 'block',
                      width: '1.4rem',
                    }}
                  />
                  <Typography variant="body2" px={1}>
                    1 Credit
                  </Typography>
                </Box>
              </CardActions>
            </>
          )}
        </CardContent>
      </BottomCard>
    </Box>
  );
}

export default Home;
