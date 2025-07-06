
import { AppLayout } from '@/components/app-layout';
import { WalletProvider } from '@/components/wallet-provider';
import { Toaster } from '@/components/ui/toaster';
import { CustomCursor } from '@/components/custom-cursor';

export default function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="font-body antialiased bg-background" suppressHydrationWarning>
        <CustomCursor />
        <WalletProvider>
        <AppLayout>
            {children}
        </AppLayout>
        <Toaster />
        </WalletProvider>
    </div>
  );
}
