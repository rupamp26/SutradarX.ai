'use client';

import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const wallets = [new PetraWallet()];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      onError={(error) => {
        console.log('Wallet Error', error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
