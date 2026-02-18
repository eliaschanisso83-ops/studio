'use server';
/**
 * @fileOverview Fluxo para sincronizar arquivos do projeto de jogo com um repositório GitHub.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SyncFileSchema = z.object({
  path: z.string(),
  content: z.string(),
});

const SyncToGithubInputSchema = z.object({
  token: z.string().describe('GitHub Personal Access Token'),
  owner: z.string().describe('Dono do repositório'),
  repo: z.string().describe('Nome do repositório'),
  files: z.array(SyncFileSchema).describe('Lista de arquivos para sincronizar'),
  commitMessage: z.string().optional().default('Update game project via AIGameForge'),
});

export type SyncToGithubInput = z.infer<typeof SyncToGithubInputSchema>;

const SyncToGithubOutputSchema = z.object({
  success: z.boolean(),
  url: z.string().optional(),
  error: z.string().optional(),
});

export type SyncToGithubOutput = z.infer<typeof SyncToGithubOutputSchema>;

export async function syncToGithub(input: SyncToGithubInput): Promise<SyncToGithubOutput> {
  return syncToGithubFlow(input);
}

const syncToGithubFlow = ai.defineFlow(
  {
    name: 'syncToGithubFlow',
    inputSchema: SyncToGithubInputSchema,
    outputSchema: SyncToGithubOutputSchema,
  },
  async (input) => {
    try {
      const { token, owner, repo, files, commitMessage } = input;

      for (const file of files) {
        // 1. Verificar se o arquivo já existe para pegar o SHA
        const getFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`;
        const getRes = await fetch(getFileUrl, {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });

        let sha: string | undefined;
        if (getRes.ok) {
          const data = await getRes.json();
          sha = data.sha;
        }

        // 2. Criar ou atualizar o arquivo
        const putFileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${file.path}`;
        const putRes = await fetch(putFileUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: commitMessage,
            content: Buffer.from(file.content).toString('base64'),
            sha: sha,
          }),
        });

        if (!putRes.ok) {
          const errorData = await putRes.json();
          throw new Error(`Erro ao enviar ${file.path}: ${errorData.message}`);
        }
      }

      return {
        success: true,
        url: `https://github.com/${owner}/${repo}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro desconhecido ao sincronizar com GitHub',
      };
    }
  }
);
