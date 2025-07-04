'use server';

import { askAssistant, type AssistantInput } from '@/ai/flows/assistant-flow';

export async function getAssistantResponse(data: AssistantInput) {
  try {
    const result = await askAssistant(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get response from assistant. Please try again later.' };
  }
}
