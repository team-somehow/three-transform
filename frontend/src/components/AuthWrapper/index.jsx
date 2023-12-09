import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase';
import { LinearProgress, Box, Typography } from '@mui/material';

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { AppContext } from '../../context/AppContext';

function AuthWrapper({ children }) {
  const auth = useContext(AppContext);
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const login = async () => {
      if (auth.loading) return;
      const timeOut = setTimeout(async () => {
        if (auth.isLoggedIn && auth?.user) {
          setLoading(false);

          const { user } = auth || {};
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.address)
          );
          const docs = await getDocs(q);
          if (docs.docs.length === 0) {
            await setDoc(doc(db, 'users', user?.address), {
              uid: user.address,
              name: user.name,
              authProvider: user?.authProvider,
              email: user.email,
              publicKey: user.publicKey,
            });
          }
        }
      }, 1000);
    };
    login();
  }, [auth, navigate]);

  if (loading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" mb={2} fontWeight={700} align="center">
          Preparing magic dust...
        </Typography>
        <LinearProgress sx={{ width: '30%', borderRadius: '1rem', mt: 2 }} />
      </Box>
    );
  return <>{children}</>;
}

export default AuthWrapper;
