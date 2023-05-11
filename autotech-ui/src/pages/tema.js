import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: 'rgb(28, 28, 28)',
            light: '#5c5c5e',
            dark: '#161616',
            contrastText: '#fff',
        },
        secondary: {
            main: '#00796b',
            light: '#8e9ae0',
            dark: 'rgb(0, 84, 74)',
            contrastText: '#fff',
        },
        info: {
            main: '#3e4243',
            light: 'rgb(147, 166, 175)',
            dark: 'rgb(84, 100, 109)',
            contrastText: '#fff',
        },
        error: {
            main: '#f44336',
            light: '#e57373',
            dark: 'd32f2f',
            contrastText: '#fff',
        },
        background: {
            default: '#ffffff',
            paper: '#d8d8d8',
        },
        text: {
            secondary: 'rgba(65,65,65,0.73)',
        },
        success: {
            main: '#428745',
            light: 'rgb(103, 159, 106)',
            dark: 'rgb(46, 94, 48)',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: 'Encode Sans',
        h1: {
            fontFamily: 'Bruno Ace',
        },
        h2: {
            fontFamily: 'Bruno Ace',
        },
        h3: {
            fontFamily: 'Bruno Ace',
        },
        h4: {
            fontFamily: 'Bruno Ace',
        },
        h5: {
            fontFamily: 'Bruno Ace',
        },
        h6: {
            fontFamily: 'Play',
        },
        subtitle1: {
            fontFamily: 'Play',
        },
        subtitle2: {
            fontFamily: 'Play',
        },
        body1: {
            fontFamily: 'Encode Sans',
        },
        body2: {
            fontFamily: 'Encode Sans',
        },
        button: {
            fontFamily: 'Encode Sans',
        },
        caption: {
            fontFamily: 'Encode Sans',
        },
        overline: {
            fontFamily: 'Encode Sans',
        },
    },
});

export default theme;