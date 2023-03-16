import App from './App';

import { Root, MuiThemeProvider, ConfigProvider, RainbowKitWrapper, APIProvider, StoreProvider } from './providers';

Root.render(
    <ConfigProvider>
        <RainbowKitWrapper>
            <MuiThemeProvider>
                <APIProvider>
                    <StoreProvider>
                        <App />
                    </StoreProvider>
                </APIProvider>
            </MuiThemeProvider>
        </RainbowKitWrapper>
    </ConfigProvider>
);
