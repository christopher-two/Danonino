'use server';

/**
 * @fileOverview AI-powered love poem generator for Dany.
 *
 * - generateLovePoem - A function that generates a personalized love poem for Dany.
 * - GenerateLovePoemInput - The input type for the generateLovePoem function.
 * - GenerateLovePoemOutput - The return type for the generateLovePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLovePoemInputSchema = z.object({
  personalDetails: z
    .string()
    .describe(
      'Specific details about Dany, such as her hobbies or shared jokes, to personalize the poem.'
    ),
});
export type GenerateLovePoemInput = z.infer<typeof GenerateLovePoemInputSchema>;

const GenerateLovePoemOutputSchema = z.object({
  poem: z.string().describe('The generated love poem for Dany.'),
});
export type GenerateLovePoemOutput = z.infer<typeof GenerateLovePoemOutputSchema>;

export async function generateLovePoem(input: GenerateLovePoemInput): Promise<GenerateLovePoemOutput> {
  return generateLovePoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLovePoemPrompt',
  input: {schema: GenerateLovePoemInputSchema},
  output: {schema: GenerateLovePoemOutputSchema},
  prompt: `Write a heartfelt and romantic love poem for Dany, incorporating the following details:

{{{personalDetails}}}

The poem should express deep affection and appreciation for her.`,
});

const generateLovePoemFlow = ai.defineFlow(
  {
    name: 'generateLovePoemFlow',
    inputSchema: GenerateLovePoemInputSchema,
    outputSchema: GenerateLovePoemOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
