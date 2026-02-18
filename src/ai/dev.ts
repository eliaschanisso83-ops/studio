import { config } from 'dotenv';
config();

import '@/ai/flows/generate-initial-game-project-flow.ts';
import '@/ai/flows/modify-game-element-with-ai.ts';
import '@/ai/flows/sync-to-github-flow.ts';
