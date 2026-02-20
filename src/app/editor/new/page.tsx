"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gamepad2, Sparkles, ArrowLeft, Loader2, Rocket, Zap, Cpu, Bot, BrainCircuit, Lock, Globe } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { generateInitialGameProject } from '@/ai/flows/generate-initial-game-project-flow';

export default function NewProject() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAI, setSelectedAI] = useState('gemini');
  const [userKey, setUserKey] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedAI = localStorage.getItem('selected_ai_model') || 'gemini';
    setSelectedAI(savedAI);
    
    const savedKeys = localStorage.getItem('ai_api_keys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setUserKey(keys[savedAI] || null);
    }
  }, []);

  const handleModelChange = (value: string) => {
    setSelectedAI(value);
    const savedKeys = localStorage.getItem('ai_api_keys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setUserKey(keys[value] || null);
    } else {
      setUserKey(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    
    try {
      // Execute the flow, passing the key only if it belongs to the selected engine
      const result = await generateInitialGameProject({ 
        userPrompt: prompt,
        userApiKey: selectedAI === 'gemini' ? (userKey || undefined) : undefined 
      });
      
      const newProjectId = Math.random().toString(36).substring(7);
      const newProject = {
        id: newProjectId,
        title: result.gameTitle,
        type: result.gameType,
        description: result.description,
        script: result.mainScript.content,
        img: `https://picsum.photos/seed/${newProjectId}/600/400`,
        createdAt: new Date().toISOString()
      };

      // Save locally
      const local = localStorage.getItem('forge_projects');
      const projects = local ? JSON.parse(local) : [];
      projects.unshift(newProject);
      localStorage.setItem('forge_projects', JSON.stringify(projects));

      toast({ title: "PROJECT_FORGED", description: `${result.gameTitle} sintetizado com sucesso.` });
      router.push(`/editor/${newProjectId}`);
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "SYNTHESIS_FAILED", 
        description: error.message || "Erro ao comunicar com a inteligência neural." 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const aiIcons: Record<string, any> = { gemini: Zap, gpt4: BrainCircuit, claude: Bot, copilot: Cpu };
  const SelectedIcon = aiIcons[selectedAI] || Sparkles;

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center p-4 md:p-8 font-body scanline">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20">
                <Gamepad2 className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-lg font-headline font-bold text-white tracking-tight uppercase italic">New_Project</h1>
            </div>
          </div>
          
          <Select value={selectedAI} onValueChange={handleModelChange}>
            <SelectTrigger className="w-[140px] h-8 bg-white/5 border-white/10 text-[9px] font-bold uppercase tracking-widest">
              <SelectedIcon className={`h-3 w-3 mr-2 ${userKey ? 'text-primary' : 'text-white/40'}`} />
              <SelectValue placeholder="AI Engine" />
            </SelectTrigger>
            <SelectContent className="bg-black border-white/10">
              <SelectItem value="gemini" className="text-[9px] font-bold uppercase text-white/60">Gemini 2.5 (Free)</SelectItem>
              <SelectItem value="gpt4" className="text-[9px] font-bold uppercase text-white/60">GPT-4o</SelectItem>
              <SelectItem value="claude" className="text-[9px] font-bold uppercase text-white/60">Claude 3.5</SelectItem>
              <SelectItem value="copilot" className="text-[9px] font-bold uppercase text-white/60">Copilot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="glass-panel border-white/5 rounded-2xl overflow-hidden">
          <CardHeader className="bg-white/[0.01] border-b border-white/5 p-6">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Sparkles className="h-4 w-4" />
              <span className="font-bold text-[9px] tracking-[0.3em] uppercase">Architect_Core_v2.5</span>
            </div>
            <CardTitle className="text-2xl font-headline font-bold text-white">Descreva sua Visão</CardTitle>
            <CardDescription className="text-white/40 text-[11px] font-medium uppercase tracking-tighter leading-tight">
              {userKey ? "ENGINE_STATUS: [BYOK_MODE_ACTIVE] - Usando sua chave privada." : "ENGINE_STATUS: [FREE_TIER_ACTIVE] - Usando créditos compartilhados."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Textarea 
                  placeholder="Ex: Um plataforma 2D neon onde o jogador muda de cor para atravessar obstáculos rítmicos..."
                  className="min-h-[160px] text-sm p-5 bg-black/40 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-xl placeholder:text-white/5 text-white"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                   {userKey ? <Zap className="h-3 w-3 text-primary" /> : <Globe className="h-3 w-3 text-white/20" />}
                   <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">
                     {selectedAI.toUpperCase()}_{userKey ? 'PRIVATE' : 'FREE'}_ENGINE
                   </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Roguelike', 'Bullet Hell', 'Metroidvania', 'Souls-like'].map(tag => (
                  <Button 
                    key={tag} 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-lg text-[8px] font-black uppercase tracking-[0.1em] border border-white/5 hover:border-primary/40 hover:bg-primary/10 text-white/30 hover:text-primary transition-all h-7"
                    onClick={() => setPrompt(p => p ? `${p} Genre: ${tag}.` : `A ${tag} project featuring...`)}
                  >
                    + {tag}
                  </Button>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full h-12 text-[10px] font-headline font-bold rounded-xl uppercase tracking-[0.2em] transition-all bg-primary hover:bg-primary/90 text-black neo-button"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-3 h-4 w-4 animate-spin" />
                  Sintetizando Visão...
                </>
              ) : (
                <>
                  <Rocket className="mr-3 h-4 w-4" />
                  Executar Gênese de Projeto
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
