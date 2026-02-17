'use server';
/**
 * @fileOverview A Genkit flow for generating an initial game project based on a text prompt.
 *
 * - generateInitialGameProject - A function that handles the game project generation process.
 * - GenerateInitialGameProjectInput - The input type for the generateInitialGameProject function.
 * - GenerateInitialGameProjectOutput - The return type for the generateInitialGameProject function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const GenerateInitialGameProjectInputSchema = z.object({
  userPrompt: z.string().describe('A text description of the game idea.'),
});
export type GenerateInitialGameProjectInput = z.infer<typeof GenerateInitialGameProjectInputSchema>;

// Output Schema
const GenerateInitialGameProjectOutputSchema = z.object({
  gameTitle: z.string().describe('A simple, non-generic name for the game.'),
  gameType: z.string().describe('The genre or type of the game (e.g., "2D Platformer", "Top-down Shooter", "Puzzle Game").'),
  description: z.string().describe('A brief description of the game.'),
  projectStructure: z.string().describe('A high-level description of the recommended Godot project file structure (e.g., "res://scenes/, res://scripts/, res://assets/").'),
  coreMechanics: z.array(z.string()).describe('A list of core game mechanics (e.g., "player movement", "coin collection", "enemy AI").'),
  mainScript: z.object({
    filename: z.string().describe('The filename for the main game script (e.g., "Player.gd", "Main.gd").'),
    content: z.string().describe('The GDScript content for the main game script, including basic setup for described mechanics.'),
  }).describe('The main script for the game logic.'),
  placeholderAssets: z.array(z.object({
    name: z.string().describe('A descriptive name for the asset (e.g., "player_sprite", "coin_sound").'),
    type: z.enum(['sprite', 'sound', 'tile', 'font']).describe('The type of asset.'),
    description: z.string().describe('A description of the asset, including simple shapes, colors, or basic sound effects (e.g., "a red square player sprite", "a \'ping\' sound for coin collection").'),
  })).describe('A list of simple placeholder assets.'),
});
export type GenerateInitialGameProjectOutput = z.infer<typeof GenerateInitialGameProjectOutputSchema>;

// Wrapper function
export async function generateInitialGameProject(input: GenerateInitialGameProjectInput): Promise<GenerateInitialGameProjectOutput> {
  return generateInitialGameProjectFlow(input);
}

// Define the prompt
const gameProjectPrompt = ai.definePrompt({
  name: 'generateGameProjectPrompt',
  input: { schema: GenerateInitialGameProjectInputSchema },
  output: { schema: GenerateInitialGameProjectOutputSchema },
  prompt: `You are an expert game developer AI specialized in generating initial game project structures and basic code for the Godot Engine.
The user will provide a text description of a game idea. Your task is to generate a basic playable game project with its core structure, simple mechanics, initial GDScripts, and placeholder assets.

Focus on generating:
1. A simple, non-generic game title.
2. The game type/genre.
3. A brief description of the game.
4. A high-level description of a typical Godot project file structure.
5. A list of core game mechanics based on the description.
6. A main GDScript with basic setup for the described mechanics.
7. A list of simple placeholder assets (shapes, colors, basic sounds) that would be used in the game.

User's game idea: {{{userPrompt}}}

Please provide the output in JSON format, strictly following the output schema provided. Ensure all string values are properly escaped for JSON.
`
});

// Define the flow
const generateInitialGameProjectFlow = ai.defineFlow(
  {
    name: 'generateInitialGameProjectFlow',
    inputSchema: GenerateInitialGameProjectInputSchema,
    outputSchema: GenerateInitialGameProjectOutputSchema,
  },
  async (input) => {
    const { output } = await gameProjectPrompt(input);
    if (!output) {
      throw new Error("Failed to generate game project. No output received from the AI model.");
    }
    return output;
  }
);
