'use server';

import { textToSpeechFlow, type TextToSpeechInput } from '@/ai/flows/tts-flow';

export async function textToSpeech(data: TextToSpeechInput) {
  try {
    const result = await textToSpeechFlow(data);
    return { success: true, data: result.audioDataUri };
  } catch (error: any) {
    console.error('Text-to-speech error:', error);
    return { success: false, error: error.message || 'Failed to generate speech.' };
  }
}
