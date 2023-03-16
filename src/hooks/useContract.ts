// Imports below migrated from Exchange useContract.ts
import { useContract, useProvider, useSigner } from 'wagmi';
import contracts from 'config/constants/contracts';

import BEP20_ABI from 'config/abi/bep20.json';
import ERC20_ABI from 'config/abi/erc20.json';
import POOL_ABI from 'config/abi/pool.json';
import LP_ABI from 'config/abi/lp.json';
import FACTORY_ABI from 'config/abi/factory.json';
import MULTICALL_ABI from 'config/abi/multicall.json';
import ROUTER_ABI from 'config/abi/router.json';
import VOTE_ABI from 'config/abi/vote.json';
import WBNB_ABI from 'config/abi/wbnb.json';

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useAddress = (contract: any) => {
    const { _network } = useProvider();
    return contract[_network.chainId ?? 97];
};

export const useCustomContract = (address: string, abi: any) => {
    const { data: signer } = useSigner();
    const provider = useProvider();
    return useContract({
        address: address,
        abi: abi,
        signerOrProvider: signer ?? provider
    });
};

export const useFactoryContract = () => {
    const address = useAddress(contracts.factory);
    return useCustomContract(address, FACTORY_ABI);
};

export const useMulticallContract = () => {
    const address = useAddress(contracts.multiCall);
    return useCustomContract(address, MULTICALL_ABI);
};

export const useRouterContract = () => {
    const address = useAddress(contracts.router);
    return useCustomContract(address, ROUTER_ABI);
};

export const useVoteContract = () => {
    const address = useAddress(contracts.vote);
    return useCustomContract(address, VOTE_ABI);
};

export const useWBNBContract = () => {
    const address = useAddress(contracts.wbnb);
    return useCustomContract(address, WBNB_ABI);
};

export function useERC20(tokenAddress?: string) {
    return useCustomContract(tokenAddress, ERC20_ABI);
}

export function useBEP20(tokenAddress?: string) {
    return useCustomContract(tokenAddress, BEP20_ABI);
}

export function useLpTokenContract(tokenAddress?: string) {
    return useCustomContract(tokenAddress, LP_ABI);
}

export function usePoolContract(poolAddress?: string) {
    return useCustomContract(poolAddress, POOL_ABI);
}
