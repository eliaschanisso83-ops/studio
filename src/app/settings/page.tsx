
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Github, 
  Zap, 
  Cpu, 
  Bot, 
  BrainCircuit,
  Lock,
  Unlock,
  CheckCircle2,
  Trash2,
  Key,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  
  const [githubToken, setGithubToken] = useState('');
  const [githubUser, setGithubUser] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [apiKeys, setApiKeys] = useState({ gemini: '', gpt4: '', claude: '', copilot: '' });

  useEffect(() => {
    setGithubToken(localStorage.getItem('gh_token') || '');
    setGithubUser(localStorage.getItem('gh_user') || '');
    setGithubRepo(localStorage.getItem('gh_repo') || '');
    setSelectedModel(localStorage.getItem('selected_ai_model') || 'gemini');
    const savedKeys = localStorage.getItem('ai_api_keys');
    if (savedKeys) setApiKeys(JSON.parse(savedKeys));
  }, []);

  const handleSave = () => {
    localStorage.setItem('gh_token', githubToken);
    localStorage.setItem('gh_user', githubUser);
    localStorage.setItem('gh_repo', githubRepo);
    localStorage.setItem('selected_ai_model', selectedModel);
    localStorage.setItem('ai_api_keys', JSON.stringify(apiKeys));
    setIsSaved(true);
    toast({ title: "Protocolos Atualizados", description: "Configurações persistidas localmente." });
    setTimeout(() => setIsSaved(false), 2000);
  };

  const clearKey = (id: string) => {
    const updatedKeys = { ...apiKeys, [id]: '' };
    setApiKeys(updatedKeys);
    localStorage.setItem('ai_api_keys', JSON.stringify(updatedKeys));
    toast({ 
      variant: "destructive", 
      title: "Chave Removida", 
      description: `A credencial do ${id.toUpperCase()} foi expurgada.` 
    });
  };

  const aiModels = [
    { id: 'gemini', name: 'Gemini 2.5', icon: Zap, provider: 'Google AI' },
    { id: 'gpt4', name: 'GPT-4o', icon: BrainCircuit, provider: 'OpenAI' },
    { id: 'claude', name: 'Claude 3.5', icon: Bot, provider: 'Anthropic' },
    { id: 'copilot', name: 'Copilot', icon: Github, provider: 'Microsoft' },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-foreground font-body pb-20 md:pb-0 scanline">
      <header className="h-14 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-[10px] tracking-widest uppercase italic">System_Config</h1>
        </div>
        <Button onClick={handleSave} size="sm" className="bg-primary hover:bg-primary/90 text-black font-headline font-bold h-8 px-4 rounded-lg glow-primary text-[9px] uppercase">
          {isSaved ? <CheckCircle2 className="h-4 w-4" /> : 'Sincronizar'}
        </Button>
      </header>

      <main className="max-w-3xl mx-auto p-4 md:p-8 space-y-6">
        <Tabs defaultValue="ai" className="w-full space-y-4">
          <TabsList className="bg-white/5 border border-white/10 p-0.5 rounded-lg h-10 w-full justify-start">
            <TabsTrigger value="ai" className="gap-2 rounded px-4 font-bold text-[8px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black h-full">
              Neural_Cores
            </TabsTrigger>
            <TabsTrigger value="github" className="gap-2 rounded px-4 font-bold text-[8px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black h-full">
              Cloud_Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {aiModels.map((model) => (
                <Card key={model.id} className={`glass-panel rounded-xl transition-all border-white/5 ${selectedModel === model.id ? 'ring-1 ring-primary/40' : ''}`}>
                  <CardHeader className="flex flex-row items-center justify-between p-3 pb-2">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded bg-black border border-white/10 ${selectedModel === model.id ? 'text-primary' : 'text-white/20'}`}>
                        <model.icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <CardTitle className="text-[10px] font-headline font-bold">{model.name}</CardTitle>
                        <p className="text-[7px] text-white/30 uppercase tracking-widest">{model.provider}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {apiKeys[model.id as keyof typeof apiKeys] && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => { e.stopPropagation(); clearKey(model.id); }}
                          className="h-5 w-5 text-white/20 hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                      <div className="pt-0.5">
                        {apiKeys[model.id as keyof typeof apiKeys] ? <Unlock className="h-2.5 w-2.5 text-primary" /> : <Lock className="h-2.5 w-2.5 text-white/10" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3 pt-0">
                    <div className="relative">
                      <Input 
                        type="password"
                        placeholder="sk-..."
                        value={apiKeys[model.id as keyof typeof apiKeys]}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, [model.id]: e.target.value }))}
                        className="bg-black/40 border-white/10 rounded-md h-8 text-[9px] font-mono text-primary pr-8"
                      />
                      <Key className="absolute right-2 top-2 h-3.5 w-3.5 text-white/5 pointer-events-none" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex gap-3">
               <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
               <p className="text-[8px] text-white/40 leading-relaxed uppercase tracking-tighter">
                 <span className="text-primary font-bold">SEGURANÇA_LOCAL:</span> Suas chaves são armazenadas localmente no dispositivo. O uso é faturado diretamente pelo provedor escolhido.
               </p>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-4">
             <Card className="glass-panel rounded-xl p-4 space-y-4 border-white/5">
                <div className="flex items-center gap-3">
                   <div className="p-1.5 bg-white/5 rounded border border-white/10 text-white/40">
                      <Github className="h-4 w-4" />
                   </div>
                   <h3 className="text-[10px] font-headline font-bold uppercase tracking-widest text-white">Cloud_Sync_Config</h3>
                </div>
                <div className="space-y-3">
                   <div className="space-y-1">
                      <label className="text-[7px] font-black uppercase tracking-widest text-white/20">Access Token (PAT)</label>
                      <Input 
                        type="password" 
                        placeholder="ghp_..." 
                        value={githubToken} 
                        onChange={(e) => setGithubToken(e.target.value)}
                        className="bg-black/40 border-white/10 rounded-md h-8 text-[9px] font-mono" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[7px] font-black uppercase tracking-widest text-white/20">GitHub_User</label>
                        <Input placeholder="user" value={githubUser} onChange={(e) => setGithubUser(e.target.value)} className="bg-black/40 border-white/10 rounded-md h-8 text-[9px]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[7px] font-black uppercase tracking-widest text-white/20">Repo_Name</label>
                        <Input placeholder="my-game" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} className="bg-black/40 border-white/10 rounded-md h-8 text-[9px]" />
                      </div>
                   </div>
                </div>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
