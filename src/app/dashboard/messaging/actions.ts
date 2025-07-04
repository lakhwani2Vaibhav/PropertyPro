'use server';

import { summarize, type SummarizeInput } from '@/ai/flows/summarize-flow';

export async function summarizeConversation(data: SummarizeInput) {
  try {
    const result = await summarize(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to summarize conversation. Please try again later.' };
  }
}
