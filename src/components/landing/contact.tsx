import Link from "next/link";
import { Button } from "../ui/button";
import { MotionDiv } from "./motion-div";

export const Contact = () => {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="container">
        <MotionDiv>
          <h2 className="mb-4 text-center">Get in touch</h2>
        </MotionDiv>
        <MotionDiv delay={0.1}>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground">
            We are here to help you with any questions you may have. Reach out
            to us and we will get back to you as soon as possible.
          </p>
        </MotionDiv>
        <MotionDiv delay={0.2} className="text-center">
          <Button asChild size="lg">
            <Link href="mailto:contact@sutradharx.com">Contact us</Link>
          </Button>
        </MotionDiv>
      </div>
    </section>
  );
};
