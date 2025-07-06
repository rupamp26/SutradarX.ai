'use client';

import { AppLogo } from '@/components/app-logo';
import { ConnectWalletButton } from './connect-wallet-button';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import React from 'react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/create-escrow', label: 'Create Escrow' },
  { href: '/dashboard/disputes', label: 'Disputes' },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 md:top-4 z-50 p-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between rounded-xl border border-border bg-background/80 p-3 shadow-lg backdrop-blur-lg">
            <Link href="/dashboard" className="flex items-center gap-3">
              <AppLogo />
              <span className="text-xl font-bold font-headline">SutradharX</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {navLinks.map((link) => (
                <Button key={link.href} variant="link" asChild className="text-foreground/80 hover:text-foreground transition-colors p-0 h-auto font-medium">
                  <Link href={link.href}>
                    {link.label}
                  </Link>
                </Button>
              ))}
            </nav>
            <div className="hidden md:block">
              <ConnectWalletButton />
            </div>
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background/80 backdrop-blur-lg">
                  <div className="flex flex-col h-full p-4">
                    <nav className="flex flex-col items-center gap-8 text-lg font-medium mt-16">
                      {navLinks.map((link) => (
                         <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors">
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto flex justify-center">
                      <ConnectWalletButton />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto max-w-6xl px-4">
        {children}
      </main>
    </div>
  );
}
