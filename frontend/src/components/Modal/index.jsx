import React from 'react';
import BottomCard from '../BottomCard';
import {
  Box,
  CardActions,
  CardContent,
  List,
  ListItem,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Typography,
} from '@mui/material';

function Modal() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '40%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '999',
      }}
    >
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
            height: '30rem',
            borderRadius: '2rem',
            transition: 'opacity 1s ease-in-out', // Add a smooth transition effect
          }}
        >
          jnvdwjnrqwkj
        </CardContent>
      </BottomCard>
    </Box>
  );
}

export default Modal;
