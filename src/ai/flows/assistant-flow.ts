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

const FlatListingOutputSchema = z.object({
    userType: z.string(),
    gender: z.string(),
    area: z.string(),
    address: z.string(),
    flatType: z.string(),
    rentBudget: z.string(),
    deposit: z.string(),
    availability: z.string(),
    phoneNumber: z.string(),
});
export type FlatListingOutput = z.infer<typeof FlatListingOutputSchema>;

const AssistantOutputSchema = z.object({
  response: z.string().describe('A brief, one-sentence introductory response. This text should NOT contain the details of the listings.'),
  listings: z.array(FlatListingOutputSchema).optional().describe('A list of 1-2 most relevant flat listings to display to the user in a structured format.'),
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
      phoneNumber: z.string(),
    })),
  },
  async ({ area }) => {
    console.log(`Tool called: getFlatListings with area: ${area}`);
    const listings = await getListings(area);
    // Return a subset of fields to keep the context for the LLM concise but include phone number.
    return listings.map(l => ({
        userType: l.userType,
        gender: l.gender,
        area: l.area,
        address: l.address,
        flatType: l.flatType,
        rentBudget: l.rentBudget,
        deposit: l.deposit,
        availability: l.availability,
        phoneNumber: l.phoneNumber,
    }));
  }
);


const systemPrompt = `You are an expert AI rental assistant for a property management platform called PropertyPro. 
Your goal is to provide helpful and concise answers to questions from landlords. 
Keep your responses friendly and professional.

When the user asks about flat listings, you MUST use the 'getFlatListings' tool to find relevant information.
You can use the 'area' parameter to filter by location if the user provides one.

After you receive data from the tool:
1.  Write a brief, one-sentence summary of your findings in the 'response' field. For example: "I found a couple of great options for you in Indiranagar." or "Here are two listings that match your request:". DO NOT include the detailed listing information in this text response.
2.  You MUST populate the 'listings' array with the structured data for the 1-2 most relevant listings. Do not add more than 2 listings to the array.
3.  If the tool returns no listings, inform the user kindly in the 'response' field and leave the 'listings' array empty.

If the user asks for contact details like a phone number for a specific listing, you can provide it in your text response if you have the data.
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

    const { output } = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        tools: [getFlatListingsTool],
        system: systemPrompt,
        messages: messages,
        output: { schema: AssistantOutputSchema },
    });

    if (!output) {
      return { response: 'Sorry, I could not generate a response. Please try again.' };
    }

    return output;
  }
);
