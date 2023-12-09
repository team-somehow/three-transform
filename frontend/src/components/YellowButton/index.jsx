import { Box, Button } from '@mui/material';

function YellowButton({ text, isDisabled, icon, ...rest }) {
  return (
    <Button
      startIcon={icon || null}
      disableElevation
      disabled={isDisabled}
      sx={{
        borderRadius: 0.5,
        border: '2px solid #2E3C51',
        background: '#F5DC22',
        color: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          background: '#F5DC22',
        },
        "&.Mui-disabled": {
          background: "#F5DC22",
          color: "grey"
        }
      }}
      variant="contained"
      {...rest}
    >
      {text && text}
    </Button>
  );
}

export default YellowButton;
