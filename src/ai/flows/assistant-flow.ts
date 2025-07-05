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

const HistoryMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const AssistantInputSchema = z.object({
  query: z.string().describe('The user query to the assistant.'),
  history: z.array(HistoryMessageSchema).optional().describe('The previous conversation history.'),
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


const systemPrompt = `You are an expert AI rental assistant for a property management platform called PropertyPro. 
Your goal is to provide helpful and concise answers to questions from landlords. 
Keep your responses friendly and professional.

When the user asks about flat listings, you MUST use the 'getFlatListings' tool to find relevant information.
You can use the 'area' parameter to filter by location if the user provides one.

After you receive the data from the tool, you MUST summarize the listings for the user in a friendly, conversational way. Present the information as a short, easy-to-read list. Only include the top 1 or 2 most relevant listings to keep the response concise. Do not just present the raw data.
For example, if the tool returns listings, your response should be like this:
"I found a couple of great options for you in HSR Layout:
- A 1BHK for ₹18,000.
- A 2BHK for ₹38,000."

If the tool returns no listings for a specific area, inform the user kindly. For example: "I'm sorry, I couldn't find any available listings in that area."
`;

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async ({ query, history }) => {
    const messageHistory = (history || []).map(msg => ({
        role: msg.role,
        content: [{ text: msg.content }]
    }));

    // 1. The history must not have consecutive messages from the same role.
    const alternatingHistory = messageHistory.reduce((acc, msg) => {
        if (acc.length === 0 || acc[acc.length - 1].role !== msg.role) {
            acc.push(msg);
        }
        return acc;
    }, [] as typeof messageHistory);
    
    // 2. The final history should end with a model message before we add the new user query.
    if (alternatingHistory.length > 0 && alternatingHistory[alternatingHistory.length - 1].role === 'user') {
      // This is an invalid state from the client, but we can recover by dropping the last user message.
      alternatingHistory.pop();
    }

    const messages = alternatingHistory;
    messages.push({ role: 'user', content: [{ text: query }] });

    const response = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        tools: [getFlatListingsTool],
        system: systemPrompt,
        messages: messages,
    });

    return { response: response.text || '' };
  }
);
