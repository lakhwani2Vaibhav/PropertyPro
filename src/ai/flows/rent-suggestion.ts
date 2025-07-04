// rent-suggestion.ts
'use server';

/**
 * @fileOverview AI-powered rent suggestion flow for landlords.
 *
 * This file exports:
 * - `getRentSuggestion` - An async function that takes property details and returns a rent suggestion.
 * - `RentSuggestionInput` - The input type for the `getRentSuggestion` function.
 * - `RentSuggestionOutput` - The output type for the `getRentSuggestion` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RentSuggestionInputSchema = z.object({
  location: z.string().describe('The location of the property.'),
  propertyType: z.string().describe('The type of property (e.g., apartment, house).'),
  furnishing: z.string().describe('The furnishing status of the property (furnished, unfurnished, semi-furnished).'),
  marketRate: z.number().describe('The current market rate for similar properties in the area.'),
  historicalYield: z.number().describe('The historical rental yield of the property.'),
  seasonalDemand: z.string().describe('The current seasonal demand (high, low, moderate).'),
  regionalDemand: z.string().describe('The current regional demand (high, low, moderate).'),
});
export type RentSuggestionInput = z.infer<typeof RentSuggestionInputSchema>;

const RentSuggestionOutputSchema = z.object({
  suggestedRentRange: z.string().describe('The suggested rent range for the property.'),
  rationale: z.string().describe('The rationale behind the suggested rent range.'),
});
export type RentSuggestionOutput = z.infer<typeof RentSuggestionOutputSchema>;

export async function getRentSuggestion(input: RentSuggestionInput): Promise<RentSuggestionOutput> {
  return rentSuggestionFlow(input);
}

const rentSuggestionPrompt = ai.definePrompt({
  name: 'rentSuggestionPrompt',
  input: {schema: RentSuggestionInputSchema},
  output: {schema: RentSuggestionOutputSchema},
  prompt: `You are an expert real estate analyst providing rent suggestions for landlords.

  Based on the following property details and market conditions, provide a suggested rent range and a brief rationale.

  Location: {{{location}}}
  Property Type: {{{propertyType}}}
  Furnishing: {{{furnishing}}}
  Current Market Rate: {{{marketRate}}}
  Historical Rental Yield: {{{historicalYield}}}
  Seasonal Demand: {{{seasonalDemand}}}
  Regional Demand: {{{regionalDemand}}}

  Respond with a suggested rent range and a rationale.
  `,
});

const rentSuggestionFlow = ai.defineFlow(
  {
    name: 'rentSuggestionFlow',
    inputSchema: RentSuggestionInputSchema,
    outputSchema: RentSuggestionOutputSchema,
  },
  async input => {
    const {output} = await rentSuggestionPrompt(input);
    return output!;
  }
);
