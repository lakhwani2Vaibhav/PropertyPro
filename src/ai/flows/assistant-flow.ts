'use server';

/**
 * @fileOverview A simple conversational AI flow for the rental assistant.
 *
 * This file exports:
 * - `askAssistant` - An async function that takes a user query and returns a text response.
 * - `AssistantInput` - The input type for the `askAssistant` function.
 * - `AssistantOutput` - The output type for the `askAssistant` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AssistantInputSchema = z.object({
  query: z.string().describe('The user query to the assistant.'),
});
export type AssistantInput = z.infer<typeof AssistantInputSchema>;

const AssistantOutputSchema = z.object({
  response: z.string().describe('The assistant response.'),
});
export type AssistantOutput = z.infer<typeof AssistantOutputSchema>;

export async function askAssistant(input: AssistantInput): Promise<AssistantOutput> {
  return assistantFlow(input);
}

const assistantPrompt = ai.definePrompt({
  name: 'assistantPrompt',
  input: { schema: AssistantInputSchema },
  output: { schema: AssistantOutputSchema },
  prompt: `You are an expert AI rental assistant for a property management platform called PropertyPro. 
  Your goal is to provide helpful and concise answers to questions from landlords. 
  Keep your responses friendly and professional.

  User query: {{{query}}}
  `,
});

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async (input) => {
    const { output } = await assistantPrompt(input);
    return output!;
  }
);
