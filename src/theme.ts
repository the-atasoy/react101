import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6a1b9a",
      light: "#9c4dcc",
      dark: "#38006b",
      contrastText: "#ffffff",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    error: {
      main: "#ff5252",
    },
    warning: {
      main: "#ffab40",
    },
    info: {
      main: "#64b5f6",
    },
    success: {
      main: "#69f0ae",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      letterSpacing: "-0.01562em",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      letterSpacing: "-0.00833em",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          padding: "8px 24px",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "none",
            boxShadow: "none",
          },
        },
        containedPrimary: {
          background: "#ffffff",
          color: "#000000",
          "&:hover": {
            background: "#A9A9A9",
          },
        },
        containedSecondary: {
          background: "#2A2A2A",
          color: "#ffffff",
          border: "1px solid #4D4D4D",
          "&:hover": {
            background: "#1C1C1C",
            border: "1px solid #3D3D3D",
          },
        },
        containedError: {
          background: "#AE0611",
          color: "#ffffff",
          "&:hover": {
            background: "#990000",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.5)",
          transition: "all 0.3s",
          "&:hover": {
            boxShadow: "0 16px 70px -12px rgba(0,0,0,0.6)",
            transform: "translateY(-3px)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ffffff",
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#ffffff",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #121212 0%, #1E1E1E 100%)",
          boxShadow: "0 10px 30px -12px rgba(0,0,0,0.42)",
        },
      },
    },
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          display: "none",
        },
      },
    },
  },
});
