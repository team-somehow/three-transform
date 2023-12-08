import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const StyleThemeProvider = (props) => {
  const useTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#10316B",
        light: "#0B409C",
      },
      secondary: {
        main: "#ff9800",
      },
      background: {
        default: "#0B031E",
        paper: "#0B031E",
      },
      text: {
        primary: "#EEEEF0",
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 900,
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          background: "rgba(43, 36, 60, 0.90)",
          boxShadow: "0px 0px 60px 0px rgba(236, 39, 182, 0.25)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(43, 36, 60, 0.90)",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& fieldset": {
            transition: "border 0.1s ease-in-out",
            borderWidth: "0px",
          },
          "&:hover fieldset": {
            borderWidth: "0",
          },
          "&:focus fieldset": {
            borderWidth: "0",
          },
        },
      },
    },
    shape: {
      borderRadius: 10,
    },
  });

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default StyleThemeProvider;
