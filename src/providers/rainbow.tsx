import { getDefaultWallets, RainbowKitProvider, darkTheme, AvatarComponent } from '@rainbow-me/rainbowkit';

import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

import { bsc, bscTestnet } from 'utils/chains';

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

type RainbowKitWrapperProps = {
    children: React.ReactNode;
};

const { chains, provider } = configureChains(
    [bsc, bscTestnet],
    [jsonRpcProvider({ rpc: (chain: Chain) => ({ http: chain.rpcUrls.default.http[0] }) })]
);

const { connectors } = getDefaultWallets({
    appName: process.env.REACT_APP_PUBLIC_APP_NAME,
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});

const CustomAvatar: AvatarComponent = ({ address, size }) => {
    return <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />;
};

const RainbowKitWrapper: React.FC<RainbowKitWrapperProps> = ({ children }) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
                appInfo={{
                    appName: process.env.REACT_APP_PUBLIC_APP_NAME,
                    learnMoreUrl: 'https://docs.dapploy.xyz/welcome-to-dapploy/introduction'
                }}
                showRecentTransactions={true}
                chains={chains}
                initialChain={chains[0]}
                avatar={CustomAvatar}
                theme={darkTheme()}
            >
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default RainbowKitWrapper;
