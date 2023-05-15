import { createTheme } from "@mui/material";

const Theme = createTheme( {
  palette: {
    type: "light",
    primary: {
      main: "#000000",
      light: "rgb(51, 51, 51)",
      dark: "rgb(0, 0, 0)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ef6c00",
      light: "rgb(242, 137, 51)",
      dark: "rgb(167, 75, 0)",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(2,2,2,0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "gba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    error: {
      main: "#b71c1c",
      light: "rgb(197, 73, 73)",
      dark: "rgb(128, 19, 19)",
      contrastText: "#fff",
    },
    info: {
      main: "#42a5f5",
      light: "rgb(103, 183, 247)",
      dark: "rgb(46, 115, 171)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    warning: {
      main: "#ff9700",
      light: "rgb(255, 171, 51)",
      dark: "rgb(178, 105, 0)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    success: {
      main: "#4caf50",
      light: "rgb(111, 191, 115)",
      dark: "rgb(53, 122, 56)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    background: {
      default: "#fafafa",
      paper: "#f3f3f3",
    },
  },
  typography: {
    fontFamily: "Arial",
  },
});

export default Theme;