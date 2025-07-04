'use server';

/**
 * @fileOverview A Genkit flow to summarize a conversation thread.
 *
 * This file exports:
 * - `summarize` - An async function that takes a conversation and returns a summary.
 * - `SummarizeInput` - The input type for the `summarize` function.
 * - `SummarizeOutput` - The output type for the `summarize` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeInputSchema = z.object({
  conversation: z.string().describe('The full conversation thread, with each message on a new line.'),
});
export type SummarizeInput = z.infer<typeof SummarizeInputSchema>;

const SummarizeOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the conversation.'),
});
export type SummarizeOutput = z.infer<typeof SummarizeOutputSchema>;

export async function summarize(input: SummarizeInput): Promise<SummarizeOutput> {
  return summarizeFlow(input);
}

const summaryPrompt = ai.definePrompt({
  name: 'summaryPrompt',
  input: { schema: SummarizeInputSchema },
  output: { schema: SummarizeOutputSchema },
  prompt: `You are an AI assistant for a landlord. Your task is to summarize the following conversation between the landlord and a tenant. 
  Focus on the key points, action items, and resolutions. Keep the summary brief and to the point.

  Conversation:
  {{{conversation}}}
  `,
});

const summarizeFlow = ai.defineFlow(
  {
    name: 'summarizeFlow',
    inputSchema: SummarizeInputSchema,
    outputSchema: SummarizeOutputSchema,
  },
  async (input) => {
    const { output } = await summaryPrompt(input);
    return output!;
  }
);
