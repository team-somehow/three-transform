import { Box, Typography } from '@mui/material';

function Navbar() {
  return (
    <Box
      sx={{
        borderBottom: '1px solid #2e3c51',
        background: 'black',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4rem',
        marginBottom: '2rem',
        px: 3,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <img
          src="logo.svg"
          alt="text"
          style={{
            display: 'block',
            width: '180px',
          }}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <img src="./creditIcon.svg" alt="Credit Icon" />
        <Typography variant="body" px={1} >
          3 Credits
        </Typography>
      </Box>
    </Box>
  );
}

export default Navbar;
