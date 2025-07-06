'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MotionDiv } from "./motion-div";

const faqs = [
  {
    question: "What is SutradharX?",
    answer:
      "SutradharX is a decentralized escrow platform that uses smart contracts to facilitate secure transactions between two parties. It integrates with UPI for seamless payments.",
  },
  {
    question: "How does SutradharX work?",
    answer:
      "A user initiates a transaction by creating a smart contract and depositing funds. The funds are held in escrow until the terms of the contract are met. Once the terms are met, the funds are released to the recipient.",
  },
  {
    question: "Is SutradharX secure?",
    answer:
      "Yes, SutradharX is built on the Aptos blockchain, which is a secure and transparent platform. All transactions are recorded on the blockchain and can be verified by anyone.",
  },
  {
    question: "What is the fee for using SutradharX?",
    answer:
      "We charge a small fee for each transaction. The fee is used to maintain the platform and to fund future development.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="container">
        <MotionDiv>
          <h2 className="mb-4 text-center">Frequently asked questions</h2>
        </MotionDiv>
        <MotionDiv delay={0.1}>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-muted-foreground">
            We have answers to your most common questions. If you can&apos;t
            find an answer here, please contact us.
          </p>
        </MotionDiv>

        <MotionDiv delay={0.2} className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="my-4 rounded-xl border-none bg-secondary p-2"
              >
                <AccordionTrigger className="p-4 text-left text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-0 text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </MotionDiv>
      </div>
    </section>
  );
};
