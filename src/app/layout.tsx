import type { Metadata } from 'next';
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  title: 'Aptos Escrow',
  description: 'The Future of Secure Transactions is Here',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn('font-body antialiased bg-background text-foreground')}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
