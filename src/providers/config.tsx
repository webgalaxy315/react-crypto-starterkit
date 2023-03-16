import BigNumber from 'bignumber.js';
import useLocalStorage from 'hooks/useLocalStorage';

import { ConfigContext, initialState } from 'contexts/config';

type ConfigProviderProps = {
    children: React.ReactNode;
};

BigNumber.config({
    EXPONENTIAL_AT: 1000,
    DECIMAL_PLACES: 80
});

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
    const origin = window?.location.origin ?? 'dapploy-frontend';
    const [config] = useLocalStorage(origin, {
        ...initialState
    });

    return <ConfigContext.Provider value={{ ...config }}>{children}</ConfigContext.Provider>;
};

export default ConfigProvider;
