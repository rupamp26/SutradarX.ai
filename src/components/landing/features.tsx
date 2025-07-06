import { MotionDiv } from "./motion-div";
import {
  BarChart,
  Code,
  Headset,
  Lock,
  ShieldCheck,
  User,
} from "lucide-react";

const features = [
  {
    icon: <Lock size={36} />,
    title: "Secure",
    description:
      "We use the latest technology to ensure that your transactions are secure and your data is safe.",
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Reliable",
    description:
      "Our platform is built on the Aptos blockchain, which is a reliable and transparent platform.",
  },
  {
    icon: <BarChart size={36} />,
    title: "Analytics",
    description:
      "We provide you with detailed analytics to help you make informed decisions.",
  },
  {
    icon: <Code size={36} />,
    title: "Developer API",
    description:
      "We provide a developer API to help you integrate our services into your own applications.",
  },
  {
    icon: <User size={36} />,
    title: "User friendly",
    description:
      "Our platform is designed to be user friendly and easy to use for everyone.",
  },
  {
    icon: <Headset size={36} />,
    title: "24/7 Support",
    description:
      "We provide 24/7 support to help you with any questions you may have.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-16 lg:py-24">
      <div className="container">
        <MotionDiv>
          <h2 className="mb-4 text-center">Features</h2>
        </MotionDiv>
        <MotionDiv delay={0.1}>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground">
            We have a lot of features to help you with your transactions. Here
            are some of our key features.
          </p>
        </MotionDiv>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <MotionDiv
              delay={0.2 + index * 0.1}
              key={index}
              className="flex flex-col gap-4 rounded-xl bg-secondary p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {feature.icon}
              </div>
              <h4 className="text-2xl">{feature.title}</h4>
              <p className="text-lg text-muted-foreground">
                {feature.description}
              </p>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  );
};
