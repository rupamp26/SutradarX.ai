import Image from "next/image";
import { MotionDiv } from "./motion-div";

const logos = [
  "logo-1.svg",
  "logo-2.svg",
  "logo-3.svg",
  "logo-4.svg",
  "logo-5.svg",
  "logo-6.svg",
];

export const Clients = () => {
  return (
    <section id="clients" className="py-16 lg:py-24">
      <div className="container">
        <MotionDiv>
          <h2 className="mb-4 text-center">Trusted by the best</h2>
        </MotionDiv>
        <MotionDiv delay={0.1}>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground">
            We are trusted by the best companies in the industry. Our partners
            and clients are our biggest strength.
          </p>
        </MotionDiv>

        <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden rounded-lg bg-background [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
          <div className="animate-scroll flex w-max flex-row">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="flex h-20 w-48 items-center justify-center"
              >
                <Image
                  src={`https://placehold.co/120x40.png`}
                  alt="logo"
                  width={120}
                  height={40}
                  data-ai-hint="company logo"
                />
              </div>
            ))}
            {logos.map((logo, index) => (
              <div
                key={index + logos.length}
                className="flex h-20 w-48 items-center justify-center"
              >
                <Image
                  src={`https://placehold.co/120x40.png`}
                  alt="logo"
                  width={120}
                  height={40}
                  data-ai-hint="company logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
