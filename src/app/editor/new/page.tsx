
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gamepad2, Sparkles, ArrowLeft, Loader2, Rocket, Globe, Zap, Cpu, Bot, BrainCircuit, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function NewProject() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedAI, setSelectedAI] = useState('gemini');
  const [hasKey, setHasKey] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const savedAI = localStorage.getItem('selected_ai_model') || 'gemini';
    setSelectedAI(savedAI);
    checkApiKey(savedAI);
  }, []);

  const checkApiKey = (modelId: string) => {
    const savedKeys = localStorage.getItem('ai_api_keys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setHasKey(!!keys[modelId]);
    } else {
      setHasKey(false);
    }
  };

  const handleModelChange = (value: string) => {
    setSelectedAI(value);
    checkApiKey(value);
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    
    if (!hasKey) {
      toast({
        variant: "destructive",
        title: "Motor Inoperante",
        description: `Insira uma API Key para ${selectedAI.toUpperCase()} nas configurações do sistema.`,
      });
      return;
    }

    setIsGenerating(true);
    // Simulação da geração com a IA do usuário
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 4000);
  };

  const aiIcons: Record<string, any> = {
    gemini: Zap,
    gpt4: BrainCircuit,
    claude: Bot,
    copilot: Cpu,
  };

  const SelectedIcon = aiIcons[selectedAI] || Sparkles;

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center p-4 md:p-8 font-body">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="h-10 w-10 text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg border border-primary/20">
                <Gamepad2 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-xl font-headline font-bold text-white tracking-tight uppercase italic">New_Forge</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <Select value={selectedAI} onValueChange={handleModelChange}>
                <SelectTrigger className="w-[150px] h-9 bg-white/5 border-white/10 text-[10px] font-bold uppercase tracking-widest">
                  <SelectedIcon className={`h-3 w-3 mr-2 ${hasKey ? 'text-primary' : 'text-red-500'}`} />
                  <SelectValue placeholder="AI Engine" />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10">
                  <SelectItem value="gemini" className="text-[10px] font-bold uppercase text-white/60">Gemini 2.5</SelectItem>
                  <SelectItem value="gpt4" className="text-[10px] font-bold uppercase text-white/60">GPT-4o</SelectItem>
                  <SelectItem value="claude" className="text-[10px] font-bold uppercase text-white/60">Claude 3.5</SelectItem>
                  <SelectItem value="copilot" className="text-[10px] font-bold uppercase text-white/60">Copilot</SelectItem>
                </SelectContent>
             </Select>
          </div>
        </div>

        {step === 1 ? (
          <Card className="glass-card border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <CardHeader className="bg-white/[0.02] border-b border-white/5 p-8">
              <div className="flex items-center gap-2 text-primary mb-3">
                <Sparkles className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-[10px] tracking-[0.3em] uppercase">Neural Architect v1.2</span>
              </div>
              <CardTitle className="text-3xl font-headline font-bold text-white tracking-tight">O que vamos forjar hoje?</CardTitle>
              <CardDescription className="text-white/40 text-sm font-medium">
                Sua ideia + Sua inteligência. Insira o prompt abaixo para iniciar a síntese do projeto.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              {!hasKey && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
                  <Lock className="h-5 w-5 text-red-500 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Atenção: Motor Bloqueado</p>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      Nenhuma API Key encontrada para o modelo <strong>{selectedAI.toUpperCase()}</strong>. 
                      Configure sua chave em <Link href="/settings" className="text-primary underline">System_Config</Link> para ativar a geração.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="relative">
                  <Textarea 
                    placeholder="Ex: Um shooter espacial rítmico onde os inimigos se movem conforme a música..."
                    className="min-h-[180px] text-base p-6 bg-black/40 border-white/10 focus-visible:ring-primary focus-visible:border-primary transition-all rounded-xl placeholder:text-white/5 text-white"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isGenerating || !hasKey}
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                     <SelectedIcon className={`h-4 w-4 ${hasKey ? 'text-primary/40' : 'text-red-500/40'}`} />
                     <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Engine: {selectedAI.toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {['Roguelike', 'Souls-like', 'Clicker', 'Bullet Hell'].map(tag => (
                    <Button 
                      key={tag} 
                      variant="ghost" 
                      size="sm" 
                      disabled={!hasKey}
                      className="rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border border-white/5 hover:border-primary/40 hover:bg-primary/10 text-white/30 hover:text-primary transition-all"
                      onClick={() => setPrompt(p => p ? `${p} Genre: ${tag}.` : `A ${tag} project featuring...`)}
                    >
                      + {tag}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                className={`w-full h-14 text-sm font-headline font-bold rounded-xl uppercase tracking-[0.2em] transition-all ${
                  hasKey 
                  ? 'bg-primary hover:bg-primary/90 text-black neo-button' 
                  : 'bg-white/5 border border-white/10 text-white/20 cursor-not-allowed'
                }`}
                onClick={handleGenerate}
                disabled={isGenerating || !prompt || !hasKey}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Synthesizing with {selectedAI.toUpperCase()}...
                  </>
                ) : (
                  <>
                    <Rocket className={`mr-3 h-5 w-5 ${hasKey ? '' : 'opacity-20'}`} />
                    {hasKey ? 'Execute_Project_Genesis' : 'API_KEY_REQUIRED'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <Card className="glass-card border-white/5 rounded-2xl p-10 space-y-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                <div className="flex flex-col items-center gap-6">
                   <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shadow-[0_0_40px_rgba(14,165,233,0.2)]">
                      <Zap className="h-10 w-10 fill-current" />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-3xl font-headline font-bold text-white tracking-tight uppercase italic">Forge_Complete</h2>
                      <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Project Initialized by {selectedAI.toUpperCase()}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-2 text-left">
                      <h3 className="font-bold text-[10px] text-primary uppercase tracking-[0.2em]">Scripts_Synthesized</h3>
                      <p className="text-[11px] text-white/60 font-mono">Main.gd, CoreLogic.gd</p>
                   </div>
                   <div className="p-5 bg-white/5 border border-white/5 rounded-xl space-y-2 text-left">
                      <h3 className="font-bold text-[10px] text-primary uppercase tracking-[0.2em]">Neural_Cost</h3>
                      <p className="text-[11px] text-white/60 font-mono">Charged to your {selectedAI} balance</p>
                   </div>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                   <Button 
                     className="w-full h-14 bg-primary hover:bg-primary/90 text-black font-headline font-bold neo-button rounded-xl uppercase tracking-widest text-xs"
                     onClick={() => router.push('/editor/1')}
                   >
                     Enter_Visual_Studio
                   </Button>
                </div>
             </Card>
          </div>
        )}

        <div className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3">
           <div className="h-px w-8 bg-white/5" />
           Your code, your keys, your destiny
           <div className="h-px w-8 bg-white/5" />
        </div>
      </div>
    </div>
  );
}
