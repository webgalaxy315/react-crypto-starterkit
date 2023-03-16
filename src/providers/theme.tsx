import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '../assets/css/index.css';
import '@rainbow-me/rainbowkit/styles.css';

import themeConfig from 'config/constants/theme';

type MuiThemeProviderProps = {
    children: React.ReactNode;
};

// ** Declare Theme Provider
const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({ children }) => {
    const theme = createTheme(themeConfig);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default MuiThemeProvider;
