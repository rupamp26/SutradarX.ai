import Image from "next/image";
import { MotionDiv } from "./motion-div";

export const BentoGrid = () => {
  return (
    <section id="bento-grid" className="py-16 lg:py-24">
      <div className="container">
        <MotionDiv>
          <h2 className="mb-4 text-center">One platform, many solutions</h2>
        </MotionDiv>
        <MotionDiv delay={0.1}>
          <p className="mx-auto mb-12 max-w-3xl text-center text-lg text-muted-foreground">
            From secure transactions to dispute resolution, SutradharX offers a
            comprehensive suite of services to meet your needs.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
          <MotionDiv className="col-span-1 rounded-xl bg-secondary p-6 lg:col-span-6 lg:h-[450px]">
            <div className="flex h-full flex-col justify-end">
              <h3 className="mb-4">
                Global transactions with the speed of UPI
              </h3>
              <p className="max-w-lg text-lg text-muted-foreground">
                Experience the future of finance with our secure and efficient
                platform. We leverage the power of blockchain to provide you
                with a seamless transaction experience.
              </p>
            </div>
          </MotionDiv>
          <MotionDiv className="relative col-span-1 flex h-[450px] flex-col justify-between overflow-hidden rounded-xl bg-secondary p-6 lg:col-span-4">
            <h3 className="max-w-sm">Secure, Transparent, and Reliable</h3>
            <Image
              src="https://placehold.co/400x400.png"
              alt="Globe"
              width={400}
              height={400}
              className="absolute -bottom-20 -right-12"
              data-ai-hint="glowing globe"
            />
          </MotionDiv>
          <MotionDiv className="relative col-span-1 flex h-[450px] flex-col justify-between overflow-hidden rounded-xl bg-secondary p-6 lg:col-span-4">
            <h3 className="max-w-sm">AI-Powered Dispute Resolution</h3>
            <Image
              src="https://placehold.co/400x400.png"
              alt="AI"
              width={400}
              height={400}
              className="absolute -bottom-20 -right-12"
              data-ai-hint="abstract AI"
            />
          </MotionDiv>
          <MotionDiv className="col-span-1 rounded-xl bg-secondary p-6 lg:col-span-6 lg:h-[450px]">
            <div className="flex h-full flex-col justify-end">
              <h3 className="mb-4">Programmable Payments</h3>
              <p className="max-w-lg text-lg text-muted-foreground">
                Automate your transactions with our programmable payment
                feature. Set conditions for your payments and let our platform
                handle the rest.
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
};
