import { useCallback, useState } from 'react';
import { useProvider } from 'wagmi';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';

export type TxResponse = TransactionResponse | null;

export type CatchTxErrorReturn = {
    fetchWithCatchTxError: (fn: () => Promise<TxResponse>) => Promise<TransactionReceipt>;
    loading: boolean;
};

type ErrorData = {
    code: number;
    message: string;
};

type TxError = {
    data: ErrorData;
    error: string;
};

const isUserRejected = (err) => {
    // provider user rejected error code
    return typeof err === 'object' && 'code' in err && err.code === 4001;
};

// -32000 is insufficient funds for gas * price + value
const isGasEstimationError = (err: TxError): boolean => err?.data?.code === -32000;

export default function useCatchTxError(): CatchTxErrorReturn {
    const provider = useProvider();
    const addRecentTransaction = useAddRecentTransaction();
    const [loading, setLoading] = useState(false);

    const handleNormalError = useCallback((error, tx?: TxResponse) => {
        if (tx) {
            console.error(
                'Error',
                'Please try again. Confirm the transaction and make sure you are paying enough gas!',
                tx.hash
            );
        } else {
            console.error(
                'Error',
                'Please try again. Confirm the transaction and make sure you are paying enough gas!'
            );
        }
    }, []);

    const fetchWithCatchTxError = useCallback(
        async (callTx: () => Promise<TxResponse>): Promise<TransactionReceipt | null> => {
            let tx: TxResponse = null;

            try {
                setLoading(true);

                /**
                 * https://github.com/vercel/swr/pull/1450
                 *
                 * wait for useSWRMutation finished, so we could apply SWR in case manually trigger tx call
                 */
                tx = await callTx();

                addRecentTransaction({
                    hash: tx.hash,
                    description: tx.hash.substring(0, 30) + '...'
                });

                console.log('Transaction Submitted', tx.hash);

                const receipt = await tx.wait();

                return receipt;
            } catch (error: any) {
                if (!isUserRejected(error)) {
                    if (!tx) {
                        handleNormalError(error);
                    } else {
                        provider
                            .call(tx, tx.blockNumber)
                            .then(() => {
                                handleNormalError(error, tx);
                            })
                            .catch((err: any) => {
                                if (isGasEstimationError(err)) {
                                    handleNormalError(error, tx);
                                } else {
                                    let recursiveErr = err;

                                    let reason: string | undefined;

                                    // for MetaMask
                                    if (recursiveErr?.data?.message) {
                                        reason = recursiveErr?.data?.message;
                                    } else {
                                        // for other wallets
                                        // Reference
                                        // https://github.com/Uniswap/interface/blob/ac962fb00d457bc2c4f59432d7d6d7741443dfea/src/hooks/useSwapCallback.tsx#L216-L222
                                        while (recursiveErr) {
                                            reason = recursiveErr.reason ?? recursiveErr.message ?? reason;
                                            recursiveErr = recursiveErr.error ?? recursiveErr.data?.originalError;
                                        }
                                    }

                                    const REVERT_STR = 'execution reverted: ';
                                    const indexInfo = reason?.indexOf(REVERT_STR);
                                    const isRevertedError = indexInfo >= 0;

                                    if (isRevertedError) reason = reason.substring(indexInfo + REVERT_STR.length);

                                    console.error(
                                        'Failed',
                                        isRevertedError
                                            ? `Transaction failed with error: ${reason}`
                                            : 'Transaction failed. For detailed error message:',
                                        tx.hash
                                    );
                                }
                            });
                    }
                } else {
                    console.error(`Error: ${error.code}`, error.message);
                }
            } finally {
                setLoading(false);
            }

            return null;
        },
        [handleNormalError, provider]
    );

    return {
        fetchWithCatchTxError,
        loading
    };
}
