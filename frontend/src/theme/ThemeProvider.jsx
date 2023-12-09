import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const StyleThemeProvider = (props) => {
  const useTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#EC27B6",
      },
      secondary: {
        main: "#FFFFFF",
      },
      background: {
        default: "#0B031E",
        paper: "rgba(255, 255, 255, 0.10)",
      },
      text: {
        primary: "#EEEEF0",
      },
    },
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 900,
    },
    overrides: {
      MuiSwitch: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          "&$checked, &$colorPrimary$checked, &$colorSecondary$checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + $track": {
              opacity: 1,
              border: "none",
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: "1px solid #bdbdbd",
          backgroundColor: "#fafafa",
          opacity: 1,
          transition:
            "background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
      MuiButton: {
        root: {
          border: 0,
          color: "white",
          height: 48,
          padding: "0.75rem 2rem",
          borderRadius: "6rem",
          background:
            "conic-gradient(from 180deg at 50% 50%, #B52BBA 4.666563235223293deg, #A12CBC 23.647727966308594deg, #8C2EBE 44.85525995492935deg, #792FBF 72.45651304721832deg, #6C30C0 82.50000178813934deg, #4B32C3 127.99007892608643deg, #5831C2 160.968976020813deg, #6330C1 178.45529437065125deg, #742FC0 189.47770357131958deg, #8D2DBE 202.95226335525513deg, #A62CBC 230.65982580184937deg, #B92ABA 251.35178089141846deg, #D029B8 276.4414644241333deg, #EC27B6 306.45145654678345deg, #C729B9 331.67617321014404deg)",
          boxShadow: "0px 0px 60px 0px rgba(236, 39, 182, 0.60)",
        },
      },
      MuiAppBar: {
        colorInherit: {
          backgroundColor: "rgba(11, 3, 30, 0.95)",
          color: "#EEEEF0",
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
        "&:focus": {
          border: "none",
          outline: "none",
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
          "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
            {
              outline: "none",
              border: "none",
            },
          "& fieldset": {
            transition: "border 0.1s ease-in-out",
            borderWidth: "0px",
            border: "none",
            outline: "none",
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
  });

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default StyleThemeProvider;
