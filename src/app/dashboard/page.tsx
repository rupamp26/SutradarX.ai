'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { motion } from 'framer-motion';
import { Landmark, ShieldCheck, DollarSign, Fuel, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/stat-card';
import { EscrowsTable } from '@/components/escrows-table';
import { TransactionsTable } from '@/components/transactions-table';
import { escrows, transactions } from '@/lib/placeholder-data';
import { useToast } from '@/hooks/use-toast';
import { fundAccountAction, getAccountBalanceAction } from '@/app/actions';
import { ConnectWalletButton } from '@/components/connect-wallet-button';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export default function DashboardPage() {
  const { connected, account, network } = useWallet();
  const { toast } = useToast();
  
  const [balance, setBalance] = useState<number | null>(null);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [isFunding, setIsFunding] = useState(false);

  useEffect(() => {
    if (connected && account) {
      setIsFetchingBalance(true);
      getAccountBalanceAction(account.address)
        .then(setBalance)
        .catch(console.error)
        .finally(() => setIsFetchingBalance(false));
    } else {
      setBalance(null);
    }
  }, [connected, account, isFunding]);

  const handleFaucet = async () => {
    if (!account) return;
    setIsFunding(true);
    try {
        const result = await fundAccountAction(account.address);
        if (result.success) {
          toast({
            title: 'Success!',
            description: 'Your account has been funded with 1 Testnet APT.',
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: result.error || 'Failed to fund your account. Please try again.',
          });
        }
    } catch(e) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
          });
    }
    
    setIsFunding(false);
  };

  const formattedBalance = balance !== null 
    ? balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })
    : '0.00';

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Wallet className="h-16 w-16 mb-4 text-primary" />
        <h1 className="text-3xl font-headline font-bold mb-2">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          To get started with SutradharX, connect your Petra Aptos wallet. This will allow you to create escrows, manage transactions, and view your dashboard.
        </p>
        <ConnectWalletButton />
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="flex flex-col gap-8 py-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Your wallet is connected to the {network?.name} network.</p>
        </div>
        <Button onClick={handleFaucet} disabled={isFunding}>
          <Fuel className="mr-2 h-4 w-4" />
          {isFunding ? 'Funding...' : 'Get Testnet APT'}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <StatCard 
            title="Your Wallet Balance" 
            value={`${formattedBalance} APT`} 
            icon={Landmark}
            description={isFetchingBalance ? "Fetching balance..." : `On ${network?.name}`}
          />
        </motion.div>
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <StatCard 
            title="Active Escrows" 
            value="0" 
            icon={ShieldCheck}
            description="No active escrows"
          />
        </motion.div>
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <StatCard 
            title="Completed Transactions" 
            value="0" 
            icon={DollarSign}
            description="No completed transactions"
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <Card className="col-span-1 lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle>Active Escrow Contracts</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <EscrowsTable escrows={escrows} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
          <Card className="col-span-1 lg:col-span-1 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TransactionsTable transactions={transactions} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
