'use server';

/**
 * @fileOverview A conversational AI flow for the rental assistant with tool-calling capabilities.
 *
 * This file exports:
 * - `askAssistant` - An async function that takes a user query and returns a text response.
 * - `AssistantInput` - The input type for the `askAssistant` function.
 * - `AssistantOutput` - The output type for the `askAssistant` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getListings } from '@/services/flat-service';

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

const getFlatListingsTool = ai.defineTool(
  {
    name: 'getFlatListings',
    description: 'Get a list of available flat listings. Can be filtered by area.',
    inputSchema: z.object({
      area: z.string().optional().describe('The area to filter listings by (e.g., "Indiranagar", "HSR Layout").'),
    }),
    outputSchema: z.array(z.object({
      userType: z.string(),
      gender: z.string(),
      area: z.string(),
      address: z.string(),
      flatType: z.string(),
      rentBudget: z.string(),
      deposit: z.string(),
      availability: z.string(),
    })),
  },
  async ({ area }) => {
    console.log(`Tool called: getFlatListings with area: ${area}`);
    const listings = await getListings(area);
    // Return a subset of fields to keep the context for the LLM concise
    return listings.map(l => ({
        userType: l.userType,
        gender: l.gender,
        area: l.area,
        address: l.address,
        flatType: l.flatType,
        rentBudget: l.rentBudget,
        deposit: l.deposit,
        availability: l.availability,
    }));
  }
);


const assistantPrompt = ai.definePrompt({
  name: 'assistantPrompt',
  input: { schema: AssistantInputSchema },
  output: { schema: AssistantOutputSchema },
  tools: [getFlatListingsTool],
  prompt: `You are an expert AI rental assistant for a property management platform called PropertyPro. 
  Your goal is to provide helpful and concise answers to questions from landlords. 
  Keep your responses friendly and professional.

  If the user asks about flat listings, use the 'getFlatListings' tool to find relevant information.
  You can use the 'area' parameter to filter by location.
  When presenting listings, summarize them clearly. Do not just dump the raw data.
  For example: "I found 3 listings in HSR Layout: a 1BHK for ₹18,000, a 2BHK for ₹38,000, and another 1BHK for ₹10,000."
  If no listings are found for a specific area, inform the user kindly.

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
