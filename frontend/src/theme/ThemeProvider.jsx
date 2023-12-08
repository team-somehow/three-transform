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
