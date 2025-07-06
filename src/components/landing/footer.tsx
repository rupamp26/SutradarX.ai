'use client';
import { AppLogo } from "@/components/app-logo";
import Link from "next/link";
import { MotionDiv } from "./motion-div";

export const Footer = () => {
  return (
    <footer id="footer" className="border-t border-t-border py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-3">
            <MotionDiv>
              <Link href="/" className="mb-4 flex items-center gap-2">
                <AppLogo />
                <span className="text-xl font-bold">SutradharX</span>
              </Link>
            </MotionDiv>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <MotionDiv>
              <h4 className="mb-4 text-lg">Platform</h4>
            </MotionDiv>
            <div className="flex flex-col gap-3">
              <MotionDiv delay={0.1}>
                <Link
                  href="#features"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Features
                </Link>
              </MotionDiv>
              <MotionDiv delay={0.2}>
                <Link
                  href="#about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </MotionDiv>
              <MotionDiv delay={0.3}>
                <Link
                  href="#bento-grid"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Pricing
                </Link>
              </MotionDiv>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <MotionDiv>
              <h4 className="mb-4 text-lg">Company</h4>
            </MotionDiv>
            <div className="flex flex-col gap-3">
              <MotionDiv delay={0.1}>
                <Link
                  href="#team"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Team
                </Link>
              </MotionDiv>
              <MotionDiv delay={0.2}>
                <Link
                  href="#contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </MotionDiv>
              <MotionDiv delay={0.3}>
                <Link
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Careers
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>

        <MotionDiv
          delay={0.4}
          className="mt-16 flex items-center justify-between border-t border-t-border pt-8"
        >
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} SutradharX. All rights reserved.
          </p>
        </MotionDiv>
      </div>
    </footer>
  );
};
