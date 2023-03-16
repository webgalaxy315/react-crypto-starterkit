import { createRoot } from 'react-dom/client';

import MuiThemeProvider from './theme';
import ConfigProvider from './config';
import APIProvider from './api';
import RainbowKitWrapper from './rainbow';
import StoreProvider from './store';

const Root = createRoot(document.getElementById('app-root') as HTMLElement);

export { Root, MuiThemeProvider, ConfigProvider, StoreProvider, RainbowKitWrapper, APIProvider };
