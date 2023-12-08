import {
  Box,
  CardActions,
  CardContent,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { FaMagic } from 'react-icons/fa';

import BottomCard from '../../components/BottomCard';
import GradientButton from '../../components/GradientButton';
import LinkInput from '../../components/LinkInput';
import React from 'react';

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
  const [inputLink, setInputLink] = React.useState('');

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      width="80%"
      mx="auto"
      height="calc(100vh - 8rem)"
    >
      <Box width="60%" mx="auto" pt={4}>
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
        <CardContent>
          <Typography variant="h2" mb={3}>
            Three Simple Steps!
          </Typography>
          <List sx={{ listStyleType: 'number' }}>
            {steps.map(({ id, text }) => (
              <ListItem key={id} sx={{ display: 'list-item' }}>
                <Typography variant="h6">{text}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions sx={{ mt: 3 }}>
          <GradientButton icon={<FaMagic />} text="Start the Magic!" />
        </CardActions>
      </BottomCard>
    </Box>
  );
}

export default Home;
