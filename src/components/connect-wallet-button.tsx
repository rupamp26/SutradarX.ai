'use client';

import { useWallet, WalletName } from '@aptos-labs/wallet-adapter-react';
import { Button } from '@/components/ui/button';

export function ConnectWalletButton() {
  const { connect, disconnect, account, connected } = useWallet();

  const handleConnect = () => {
    connect('Petra' as WalletName);
  };
  
  const shortAddress = account?.address ? `${account.address.slice(0, 6)}...${account.address.slice(-4)}` : '';

  if (!connected) {
    return (
      <Button 
        onClick={handleConnect} 
        variant="outline"
        className="rounded-xl px-6 backdrop-blur-md transition-colors"
      >
        Connect Wallet
      </Button>
    )
  }

  return (
    <Button 
      onClick={() => disconnect()} 
      variant="outline"
      className="rounded-xl px-4 py-2 font-mono text-sm backdrop-blur-md transition-colors"
    >
      {shortAddress}
    </Button>
  );
}
