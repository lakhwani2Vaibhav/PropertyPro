'use server';

import { getRentSuggestion, type RentSuggestionInput } from '@/ai/flows/rent-suggestion';

export async function suggestRent(data: RentSuggestionInput) {
  try {
    const result = await getRentSuggestion(data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get rent suggestion. Please try again later.' };
  }
}
