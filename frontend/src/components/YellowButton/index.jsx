import { Box, Button } from "@mui/material";

function YellowButton({ text, icon, ...rest }) {
  return (
    <Button
      startIcon={icon || null}
      disableElevation
      sx={{
        borderRadius: 0.5,
        border: "2px solid #2E3C51",
        background: "#F5DC22",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          background: "#F5DC22",
        },
      }}
      variant="contained"
      {...rest}
    >
      {text && text}
    </Button>
  );
}

export default YellowButton;
