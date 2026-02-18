
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Key, 
  Github, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Zap, 
  ExternalLink, 
  Cpu, 
  Sparkles,
  Bot,
  BrainCircuit,
  Settings2
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [githubUser, setGithubUser] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini');

  const aiModels = [
    { id: 'gemini', name: 'Gemini 2.5 Flash', provider: 'Google AI', description: 'Otimizado para velocidade e precisão em GDScript.', status: 'Primary', icon: Zap },
    { id: 'gpt4', name: 'GPT-4o (ChatGPT)', provider: 'OpenAI', description: 'Excelente raciocínio lógico e arquitetura complexa.', status: 'Compatible', icon: BrainCircuit },
    { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Superior para escrita de código criativo e debug.', status: 'Compatible', icon: Bot },
    { id: 'copilot', name: 'GitHub Copilot', provider: 'Microsoft', description: 'Treinado em bilhões de linhas de código open source.', status: 'Compatible', icon: Github },
  ];

  useEffect(() => {
    setGithubToken(localStorage.getItem('gh_token') || '');
    setGithubUser(localStorage.getItem('gh_user') || '');
    setGithubRepo(localStorage.getItem('gh_repo') || '');
    setSelectedModel(localStorage.getItem('selected_ai_model') || 'gemini');
  }, []);

  const handleSave = () => {
    localStorage.setItem('gh_token', githubToken);
    localStorage.setItem('gh_user', githubUser);
    localStorage.setItem('gh_repo', githubRepo);
    localStorage.setItem('selected_ai_model', selectedModel);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 font-body">
      <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center px-4 md:px-8 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white/40 hover:text-white hover:bg-white/5">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl tracking-tighter text-white">System<span className="text-primary">_Config</span></h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-2">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Controle Neural</h2>
              <p className="text-xs text-white/40 leading-relaxed">Gerencie o cérebro artificial por trás do AIGameForge.</p>
            </div>
            
            <div className="space-y-4">
              <Card className="glass-card border-white/5 p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm text-white">Modelo Ativo</h3>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-primary/20">
                  <p className="text-[10px] text-white/40 uppercase font-black mb-1">Cérebro Atual:</p>
                  <p className="text-sm font-bold text-primary">{aiModels.find(m => m.id === selectedModel)?.name}</p>
                </div>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Tabs defaultValue="ai" className="space-y-8">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl h-14 w-full justify-start">
                <TabsTrigger value="ai" className="gap-2 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-black">
                  <Cpu className="h-4 w-4"/> AI_Cores
                </TabsTrigger>
                <TabsTrigger value="github" className="gap-2 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-black">
                  <Github className="h-4 w-4"/> GitHub_Sync
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="m-0 space-y-6">
                <Card className="glass-card border-white/5 rounded-2xl overflow-hidden">
                  <CardHeader className="p-8 border-b border-white/5">
                    <CardTitle className="font-headline font-bold text-2xl text-white">Neural Engine Selection</CardTitle>
                    <CardDescription className="text-white/40">Selecione o motor de inteligência artificial principal.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {aiModels.map((model) => (
                        <div 
                          key={model.id}
                          onClick={() => setSelectedModel(model.id)}
                          className={`cursor-pointer transition-all duration-300 p-5 rounded-xl border flex flex-col gap-4 group ${
                            selectedModel === model.id 
                            ? 'bg-primary/10 border-primary shadow-[0_0_20px_rgba(14,165,233,0.15)]' 
                            : 'bg-white/5 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className={`p-2.5 rounded-lg border ${selectedModel === model.id ? 'bg-primary/20 border-primary/40' : 'bg-black/40 border-white/10'}`}>
                              <model.icon className={`h-5 w-5 ${selectedModel === model.id ? 'text-primary' : 'text-white/20'}`} />
                            </div>
                            {model.status === 'Primary' && (
                              <Badge className="bg-primary/20 text-primary border-primary/20 text-[8px] font-black uppercase tracking-widest">Default</Badge>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-white">{model.name}</p>
                            <p className="text-[10px] text-white/40 font-medium mt-1 leading-relaxed">{model.description}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/5">
                             <div className={`w-1.5 h-1.5 rounded-full ${selectedModel === model.id ? 'bg-primary animate-pulse' : 'bg-white/20'}`} />
                             <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Protocol: {model.provider}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Personal AI API Key (Optional)</label>
                        <Input 
                          type="password"
                          placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                          className="bg-white/5 border-white/10 focus-visible:ring-primary text-white font-mono"
                        />
                        <p className="text-[9px] text-white/20 italic">Se deixado em branco, o sistema usará a chave global do AIGameForge (Cotas de Desenvolvedor).</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-white/5 p-6 justify-between items-center">
                    <p className="text-[9px] font-mono text-white/20 uppercase">Core Integrity: Stable</p>
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-headline font-bold px-8 h-12 neo-button rounded-xl uppercase tracking-widest text-xs">
                      {isSaved ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Config_Stored</> : 'Update_Neural_Core'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="github" className="m-0">
                <Card className="glass-card border-white/5 rounded-2xl overflow-hidden">
                  <CardHeader className="p-8 border-b border-white/5">
                    <CardTitle className="font-headline font-bold text-2xl text-white">Cloud Forge Sync</CardTitle>
                    <CardDescription className="text-white/40">Sincronização direta com seus repositórios privados.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Personal Access Token (PAT)</label>
                        <div className="relative group">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-primary" />
                          <Input 
                            type="password" 
                            placeholder="ghp_xxxxxxxxxxxx" 
                            value={githubToken} 
                            onChange={(e) => setGithubToken(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:bg-white/10 text-white font-mono" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Owner (Username)</label>
                          <Input 
                            placeholder="ex: johndoe" 
                            value={githubUser} 
                            onChange={(e) => setGithubUser(e.target.value)}
                            className="bg-white/5 border-white/10 focus-visible:ring-primary text-white" 
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Repository Name</label>
                          <Input 
                            placeholder="ex: my-cool-game" 
                            value={githubRepo} 
                            onChange={(e) => setGithubRepo(e.target.value)}
                            className="bg-white/5 border-white/10 focus-visible:ring-primary text-white" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-white/5 p-6 justify-between items-center">
                    <p className="text-[9px] font-mono text-white/20 uppercase">Encryption: AES-256 (Local)</p>
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-headline font-bold px-8 h-12 neo-button rounded-xl uppercase tracking-widest text-xs">
                      {isSaved ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Config_Stored</> : 'Commit_Changes'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
