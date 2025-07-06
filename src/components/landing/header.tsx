"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AlignJustify, X } from "lucide-react";
import { Button } from "../ui/button";
import { AppLogo } from "../app-logo";

const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "#about",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "Team",
    href: "#team",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <AppLogo />
            <span className="text-xl font-bold">SutradharX</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center md:hidden"
            >
              <AlignJustify size={24} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed left-0 top-0 z-50 h-screen w-full bg-background/80 backdrop-blur-md transition-all duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <AppLogo />
              <span className="text-xl font-bold">SutradharX</span>
            </Link>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <nav className="mt-8 flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
