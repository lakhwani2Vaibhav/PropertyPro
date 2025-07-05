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
  listings: z.array(FlatListingOutputSchema).optional().describe('A list of the most relevant flat listings to display to the user in a structured format.'),
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
1.  Write a brief, one-sentence summary of your findings in the 'response' field. For example: "I found a few great options for you in Kasavanahalli." or "Here are the listings that match your request:". DO NOT include the detailed listing information in this text response.
2.  Populate the 'listings' array with the structured data for the most relevant listings that match the user's query. If the user specifies a number of listings to show, you should return that many. Otherwise, return a reasonable number of the best matches.
3.  If the tool returns no listings, inform the user kindly in the 'response' field and leave the 'listings' array empty.

If the user asks for contact details like a phone number for a specific listing, you can provide it in your text response if you have the data.
`;

const MAX_CONVERSATION_MESSAGES = 6; // Limit to the last 6 messages (3 turns of conversation)

const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: AssistantInputSchema,
    outputSchema: AssistantOutputSchema,
  },
  async ({ query, history }) => {
    
    // 1. Combine the history with the new user query.
    const allMessages = [
      ...(history || []).map(msg => ({
        role: msg.role,
        content: [{ text: msg.content }],
      })),
      { role: 'user' as const, content: [{ text: query }] },
    ];

    // 2. Limit the conversation history to the last N messages to prevent token overflow.
    const trimmedHistory = allMessages.slice(-MAX_CONVERSATION_MESSAGES);
    
    // 3. Ensure the history starts with a 'user' role by finding the first user message in the *trimmed* history.
    const firstUserIndex = trimmedHistory.findIndex(m => m.role === 'user');
    const historyStartingWithUser = firstUserIndex > -1 ? trimmedHistory.slice(firstUserIndex) : [];
    
    // 4. Ensure the final history has alternating user/model roles.
    const sanitizedMessages = historyStartingWithUser.reduce((acc, msg) => {
        if (acc.length === 0 || acc[acc.length - 1].role !== msg.role) {
            acc.push(msg);
        }
        return acc;
    }, [] as typeof trimmedHistory);

    // 5. If sanitation results in an empty list, handle it.
    if (sanitizedMessages.length === 0) {
      return { response: 'Sorry, I could not process your request. Please try again.' };
    }

    const { output } = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        tools: [getFlatListingsTool],
        system: systemPrompt,
        messages: sanitizedMessages,
        output: { schema: AssistantOutputSchema },
    });

    if (!output) {
      return { response: 'Sorry, I could not generate a response. Please try again.' };
    }

    return output;
  }
);
