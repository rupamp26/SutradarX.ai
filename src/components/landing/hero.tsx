"use client";

import Link from "next/link";
import CountUp from "react-countup";
import { Button } from "../ui/button";
import { MotionDiv } from "./motion-div";

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen py-16 lg:py-24">
      <div className="container">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]" />
        </div>
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
          <div className="flex flex-col items-center gap-10">
            <MotionDiv className="flex flex-col items-center gap-4">
              <h1 className="max-w-4xl text-center">
                The Future of Secure Transactions is Here
              </h1>
              <p className="max-w-2xl text-center text-lg text-muted-foreground">
                SutradharX is a decentralized escrow platform that uses smart
                contracts to facilitate secure transactions between two parties.
              </p>
            </MotionDiv>
            <MotionDiv delay={0.1}>
              <Button asChild size="lg">
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </MotionDiv>
            <MotionDiv
              delay={0.2}
              className="flex flex-col items-center gap-8 lg:flex-row"
            >
              <div className="flex flex-col items-center">
                <h3>
                  <CountUp end={10} duration={5} />+
                </h3>
                <p className="text-muted-foreground">Years of experience</p>
              </div>
              <div className="hidden h-12 w-px bg-border lg:block" />
              <div className="flex flex-col items-center">
                <h3>
                  <CountUp end={200} duration={5} />+
                </h3>
                <p className="text-muted-foreground">Happy clients</p>
              </div>
              <div className="hidden h-12 w-px bg-border lg:block" />
              <div className="flex flex-col items-center">
                <h3>
                  <CountUp end={500} duration={5} />+
                </h3>
                <p className="text-muted-foreground">Projects completed</p>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};
