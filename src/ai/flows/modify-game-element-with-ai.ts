'use server';
/**
 * @fileOverview This file defines a Genkit flow for modifying game elements based on natural language instructions.
 *
 * - modifyGameElementWithAI - A function that handles the modification of a game element.
 * - ModifyGameElementWithAIInput - The input type for the modifyGameElementWithAI function.
 * - ModifyGameElementWithAIOutput - The return type for the modifyGameElementWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModifyGameElementWithAIInputSchema = z.object({
  gameElementDescription: z.string().optional().describe('A description of the game element to be modified.'),
  gameElementScript: z.string().optional().describe('The existing script of the game element, if any. Example: GDScript for Godot.'),
  modificationInstruction: z.string().describe('The natural language instruction for modifying the game element (e.g., "make this enemy move faster", "add a score for collecting coins").'),
  gameEngineType: z.string().describe('The type of game engine being used (e.g., "Godot").'),
  scriptLanguage: z.string().optional().describe('The scripting language used by the game element (e.g., "GDScript").'),
}).refine(
  (data) => data.gameElementDescription || data.gameElementScript,
  "Either 'gameElementDescription' or 'gameElementScript' must be provided."
);
export type ModifyGameElementWithAIInput = z.infer<typeof ModifyGameElementWithAIInputSchema>;

const ModifyGameElementWithAIOutputSchema = z.object({
  modifiedGameElementScript: z.string().nullable().optional().describe('The AI-generated modified script for the game element, if applicable.'),
  modifiedGameElementProperties: z.record(z.string(), z.any()).nullable().optional().describe('Key-value pairs of modified properties for the game element, if applicable.'),
  explanation: z.string().describe('A brief explanation of the changes made by the AI.'),
  notes: z.string().optional().describe('Any additional notes or warnings regarding the modifications.'),
});
export type ModifyGameElementWithAIOutput = z.infer<typeof ModifyGameElementWithAIOutputSchema>;

export async function modifyGameElementWithAI(input: ModifyGameElementWithAIInput): Promise<ModifyGameElementWithAIOutput> {
  return modifyGameElementWithAIFlow(input);
}

const prompt = ai.definePrompt({
  name: 'modifyGameElementWithAIPrompt',
  input: {schema: ModifyGameElementWithAIInputSchema},
  output: {schema: ModifyGameElementWithAIOutputSchema},
  prompt: `You are an expert game developer specializing in creating and modifying game elements and scripts for {{gameEngineType}} using {{scriptLanguage}} (if provided).
Your task is to modify a game element based on the user's specific instructions.

Follow these rules:
1. If 'gameElementScript' is provided, prioritize modifying the script directly.
2. If only 'gameElementDescription' is provided, suggest appropriate property changes or script snippets.
3. Always output a valid JSON object matching the specified schema.
4. Provide a clear 'explanation' of the changes made.
5. Populate 'modifiedGameElementScript' or 'modifiedGameElementProperties' based on the modification. One of them can be null if not applicable.

---
Game Element Description: {{{gameElementDescription}}}
Game Element Script:
```{{scriptLanguage}}
{{{gameElementScript}}}
```
Modification Instruction: {{{modificationInstruction}}}
---
`
});

const modifyGameElementWithAIFlow = ai.defineFlow(
  {
    name: 'modifyGameElementWithAIFlow',
    inputSchema: ModifyGameElementWithAIInputSchema,
    outputSchema: ModifyGameElementWithAIOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
