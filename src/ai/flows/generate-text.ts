'use server';

/**
 * @fileOverview Text generation flow.
 *
 * - generateText - A function that generates text based on a prompt.
 * - GenerateTextOutput - The output type for the generateText function.
 * - GenerateTextInput - The input type for the generateText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTextInputSchema = z.object({
  prompt: z.string().describe('The prompt to generate text from.'),
  temperature: z.number().optional().describe('The temperature of the model.'),
  presencePenalty: z.number().optional().describe('The presence penalty of the model.'),
  frequencyPenalty: z.number().optional().describe('The frequency penalty of the model.'),
});
export type GenerateTextInput = z.infer<typeof GenerateTextInputSchema>;

const GenerateTextOutputSchema = z.object({
  text: z.string().describe('The generated text.'),
});
export type GenerateTextOutput = z.infer<typeof GenerateTextOutputSchema>;

export async function generateText(input: GenerateTextInput): Promise<GenerateTextOutput> {
  return generateTextFlow(input);
}

const generateTextPrompt = ai.definePrompt({
  name: 'generateTextPrompt',
  input: {schema: GenerateTextInputSchema},
  output: {schema: GenerateTextOutputSchema},
  prompt: `{{prompt}}`,
  config: {
    // TODO: Look into better safety settings for text generation
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const generateTextFlow = ai.defineFlow(
  {
    name: 'generateTextFlow',
    inputSchema: GenerateTextInputSchema,
    outputSchema: GenerateTextOutputSchema,
  },
  async input => {
    const {output} = await generateTextPrompt({
      prompt: input.prompt,
      temperature: input.temperature,
      presencePenalty: input.presencePenalty,
      frequencyPenalty: input.frequencyPenalty,
    });
    return output!;
  }
);
