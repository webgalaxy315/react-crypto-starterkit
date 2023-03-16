import { Chain } from '@rainbow-me/rainbowkit';

export const bsc: Chain = {
    id: 56,
    name: 'BSC',
    network: 'binance-smart-chain',
    iconUrl: 'https://cryptologos.cc/logos/thumbs/bnb.png',
    iconBackground: 'transparent',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18
    },
    rpcUrls: {
        public: {
            http: ['https://bsc-dataseed.binance.org']
        },
        default: {
            http: ['https://bsc-dataseed.binance.org']
        }
    },
    blockExplorers: {
        default: { name: 'BSC Scan', url: 'https://bscscan.com' }
    },
    testnet: false
};

export const bscTestnet: Chain = {
    id: 97,
    name: 'BSC Testnet',
    network: 'binance-smart-chain-testnet',
    iconUrl: 'https://cryptologos.cc/logos/thumbs/bnb.png',
    iconBackground: 'transparent',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18
    },
    rpcUrls: {
        public: {
            http: ['https://data-seed-prebsc-1-s1.binance.org:8545']
        },
        default: {
            http: ['https://data-seed-prebsc-1-s1.binance.org:8545']
        }
    },
    blockExplorers: {
        default: { name: 'BSC Scan', url: 'https://testnet.bscscan.com' }
    },
    testnet: true
};
