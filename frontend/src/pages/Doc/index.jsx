import React from 'react';
import BottomCard from '../../components/BottomCard';
import {
  Box,
  CardActions,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material';

function Doc() {
  const data = [
    {
      id: 1,
      text: 'Initial Setup',
      subheadings: [
        {
          id: 1,
          heading: 'Obtain ABI and Integrate into Frontend',
          description:
            'Retrieve the ABI (Application Binary Interface) of the smart contract and seamlessly integrate it into the frontend code to facilitate communication between the user interface and the blockchain',
        },
        {
          id: 2,
          heading: ' Implement Arcana Login for Wallet Address Retrieval',
          description:
            'Integrate Arcana login functionality to enable users to log in, ensuring a secure and user-friendly experience while obtaining their wallet address for subsequent interactions with the smart contract.',
        },
        {
          id: 3,
          heading: 'Integrate Contract Connection Code',
          description:
            'Embed the contract connection code directly into the relevant file where it is required, ensuring a smooth and efficient connection between the frontend and the smart contract on the blockchain.',
        },
        {
          id: 4,
          heading: 'Customize Contract Function Calls',
          description:
            'Tailor the code to invoke the specific contract function based on the requirements, ensuring accurate and efficient execution. For example, initiate the function "sendName" with the parameter "name" for the desired blockchain interaction.',
        },
      ],
    },
    {
      id: 2,
      text: 'Function Endpoints',
    },
  ];

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mx="auto"
      height="calc(100vh - 4rem)"
      padding={2}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.20)',
          background: 'linear-gradient(180deg, #2B243C 0%, #0B031E 100%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '20%',
            height: '100%',
            p: 2,
          }}
        >
          {data.map(({ id, text }) => (
            <ListItem key={id} sx={{ display: 'list-item' }}>
              <Typography variant="body" fontWeight={500}>
                {text}
              </Typography>
            </ListItem>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
            height: '100%',
            p: 2,
            pr: 10,
            scrollBehavior: 'auto',
          }}
        >
          {data.map(({ id, text, subheadings }) => (
            <Box key={id}>
              <Typography variant="h4" fontWeight={700} mt={1}>
                {text}
              </Typography>
              {subheadings?.map(({ id, heading, description }) => (
                <Box key={id} mb={3} ml={3}>
                  <Typography variant="h5" fontWeight={700} mt={4} mb={1.5}>
                    {`${id}. `}
                    {heading}
                  </Typography>
                  <Typography variant="body" fontWeight={500}>
                    {description}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Doc;
