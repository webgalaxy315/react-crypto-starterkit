import { ThemeOptions } from '@mui/material';

const themeConfig: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#286EF6'
        },
        secondary: {
            main: '#313cad'
        },
        error: {
            main: '#db084e'
        },
        background: {
            paper: '#171717',
            default: '#0d1117'
        }
    },
    typography: {
        fontFamily: 'Poppins',
        fontSize: 14
    },
    shape: {
        borderRadius: 4
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 991,
            lg: 1200,
            xl: 1536
        }
    }
};

export default themeConfig;
