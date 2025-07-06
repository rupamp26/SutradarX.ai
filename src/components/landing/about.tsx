import Image from "next/image";
import { MotionDiv } from "./motion-div";

export const About = () => {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <MotionDiv>
            <Image
              src="https://placehold.co/550x550.png"
              alt="About"
              width={550}
              height={550}
              className="rounded-xl"
              data-ai-hint="futuristic business illustration"
            />
          </MotionDiv>
          <div className="flex flex-col gap-6">
            <MotionDiv>
              <h2 className="max-w-md">
                We are developing the best & secure platform
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.1}>
              <p className="max-w-lg text-lg text-muted-foreground">
                SutradharX is a pioneering platform that integrates the trust
                and transparency of blockchain with the convenience of UPI. We
                provide a seamless and secure escrow service, ensuring that
                your transactions are safe, transparent, and reliable.
              </p>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};
