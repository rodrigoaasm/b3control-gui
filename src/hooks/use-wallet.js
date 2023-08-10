import { useContext } from 'react';
import { WalletContext } from 'src/contexts/wallet-context';

export const useWallet = () => useContext(WalletContext);
