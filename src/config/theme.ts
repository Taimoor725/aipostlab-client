// src/config/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#9a32ef",
      light: "#cc92fc",
      dark: "#6e25aa",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b365f2",
    },
    text: {
      primary: "#000000", // Set your desired dark blue or black color here
      secondary: "#333333", // Optional: Set a secondary text color if needed
    },
    background: {
      default: "#ffffff",
      paper: "#EBEBEB",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

// Set CSS variables
const root = document.documentElement;

root.style.setProperty("--text-primary", theme.palette.text.primary);
root.style.setProperty("--text-secondary", theme.palette.text.secondary);
root.style.setProperty("--primary", theme.palette.primary.main);
root.style.setProperty("--primary-light", theme.palette.primary.light);
root.style.setProperty("--primary-dark", theme.palette.primary.dark);
root.style.setProperty(
  "--primary-contrast",
  theme.palette.primary.contrastText
);
root.style.setProperty("--secondary", theme.palette.secondary.main);
root.style.setProperty("--background-paper", theme.palette.background.paper); // Updated variable
root.style.setProperty(
  "--background-default",
  theme.palette.background.default
); // Updated variable

export default theme;
