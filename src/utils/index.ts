// import { Contract } from '@ethersproject/contracts';
// import type { Signer } from '@ethersproject/abstract-signer';
// import type { Provider } from '@ethersproject/providers';
import { getAddress } from '@ethersproject/address';
// import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
// import { CHAIN_ID } from 'config/constants/networks';
// import { BASE_BSC_SCAN_URLS } from '../config';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
    try {
        return getAddress(value);
    } catch {
        return false;
    }
}

export function isValidUrl(value: string): boolean {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

// export function getBscScanLink(
//     data: string | number,
//     type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
//     chainIdOverride?: number
// ): string {
//     const chainId = chainIdOverride || CHAIN_ID;
//     switch (type) {
//         case 'transaction': {
//             return `${BASE_BSC_SCAN_URLS[chainId]}/tx/${data}`;
//         }
//         case 'token': {
//             return `${BASE_BSC_SCAN_URLS[chainId]}/token/${data}`;
//         }
//         case 'block': {
//             return `${BASE_BSC_SCAN_URLS[chainId]}/block/${data}`;
//         }
//         case 'countdown': {
//             return `${BASE_BSC_SCAN_URLS[chainId]}/block/countdown/${data}`;
//         }
//         default: {
//             return `${BASE_BSC_SCAN_URLS[chainId]}/address/${data}`;
//         }
//     }
// }

// // account is not optional
// export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
//     return library.getSigner(account).connectUnchecked();
// }

// // account is optional
// export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
//     return account ? getSigner(library, account) : library;
// }
