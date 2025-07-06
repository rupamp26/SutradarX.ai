"use server";

import { mediateDispute, MediateDisputeInput, MediateDisputeOutput } from "@/ai/flows/mediate-dispute";
import { z } from "zod";

const MediateDisputeActionSchema = z.object({
  contractTerms: z.string(),
  evidence: z.string(),
});

export async function handleMediateDispute(
  input: MediateDisputeInput
): Promise<MediateDisputeOutput | null> {
  const parsedInput = MediateDisputeActionSchema.safeParse(input);

  if (!parsedInput.success) {
    console.error("Invalid input for handleMediateDispute:", parsedInput.error);
    return null;
  }

  try {
    const result = await mediateDispute(parsedInput.data);
    return result;
  } catch (error) {
    console.error("Error in mediateDispute flow:", error);
    // Optionally, rethrow or handle the error as needed
    throw new Error("Failed to process dispute mediation.");
  }
}
