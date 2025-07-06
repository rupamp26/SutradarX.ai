'use client';

import { EscrowForm } from '@/components/escrow-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export default function CreateEscrowPage() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="py-8"
    >
      <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
        <Card className="shadow-lg mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create a New Smart Escrow</CardTitle>
            <CardDescription>
              Follow the steps below to create a secure, programmable UPI escrow contract on the Aptos blockchain.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EscrowForm />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
