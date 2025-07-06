// src/ai/flows/mediate-dispute.ts
'use server';

/**
 * @fileOverview A dispute mediation AI agent.
 *
 * - mediateDispute - A function that handles the dispute mediation process.
 * - MediateDisputeInput - The input type for the mediateDispute function.
 * - MediateDisputeOutput - The return type for the mediateDispute function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MediateDisputeInputSchema = z.object({
  evidence: z
    .string()
    .describe('The evidence provided by both parties in the dispute.'),
  contractTerms: z.string().describe('The terms of the escrow contract.'),
});
export type MediateDisputeInput = z.infer<typeof MediateDisputeInputSchema>;

const MediateDisputeOutputSchema = z.object({
  summary: z.string().describe('A summary of the evidence presented.'),
  suggestedResolution: z
    .string()
    .describe('A suggested resolution to the dispute.'),
});
export type MediateDisputeOutput = z.infer<typeof MediateDisputeOutputSchema>;

export async function mediateDispute(input: MediateDisputeInput): Promise<MediateDisputeOutput> {
  return mediateDisputeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mediateDisputePrompt',
  input: {schema: MediateDisputeInputSchema},
  output: {schema: MediateDisputeOutputSchema},
  prompt: `You are an expert mediator specializing in resolving disputes related to escrow contracts.

You will use the contract terms and the evidence provided by both parties to summarize the evidence and suggest a fair resolution to the dispute.

Contract Terms: {{{contractTerms}}}
Evidence: {{{evidence}}}`,
});

const mediateDisputeFlow = ai.defineFlow(
  {
    name: 'mediateDisputeFlow',
    inputSchema: MediateDisputeInputSchema,
    outputSchema: MediateDisputeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
