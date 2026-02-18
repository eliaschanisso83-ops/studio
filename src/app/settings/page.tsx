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
  ShieldAlert,
  Database
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
      <header className="h-12 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-white rounded-md">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-[9px] tracking-[0.2em] uppercase italic text-white/60">System_Config</h1>
        </div>
        <Button onClick={handleSave} size="sm" className="bg-primary hover:bg-primary/90 text-black font-headline font-bold h-7 px-3 rounded-md glow-primary text-[8px] uppercase neo-button">
          {isSaved ? <CheckCircle2 className="h-3.5 w-3.5" /> : 'Commit_Changes'}
        </Button>
      </header>

      <main className="max-w-2xl mx-auto p-4 md:p-8 space-y-4">
        <Tabs defaultValue="ai" className="w-full space-y-3">
          <TabsList className="bg-white/5 border border-white/5 p-0.5 rounded-md h-8 w-full justify-start">
            <TabsTrigger value="ai" className="gap-2 rounded px-3 font-bold text-[7px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black h-full">
              Neural_Core
            </TabsTrigger>
            <TabsTrigger value="github" className="gap-2 rounded px-3 font-bold text-[7px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black h-full">
              Cloud_Link
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {aiModels.map((model) => (
                <Card key={model.id} className={`glass-panel rounded-lg transition-all border-white/5 ${selectedModel === model.id ? 'ring-1 ring-primary/30 bg-primary/[0.02]' : ''}`}>
                  <CardHeader className="flex flex-row items-center justify-between p-2 pb-1">
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded bg-black border border-white/10 ${selectedModel === model.id ? 'text-primary' : 'text-white/10'}`}>
                        <model.icon className="h-3 w-3" />
                      </div>
                      <div>
                        <CardTitle className="text-[9px] font-headline font-bold italic">{model.name}</CardTitle>
                        <p className="text-[6px] text-white/20 uppercase tracking-widest">{model.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {apiKeys[model.id as keyof typeof apiKeys] && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={(e) => { e.stopPropagation(); clearKey(model.id); }}
                          className="h-4 w-4 text-white/10 hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </Button>
                      )}
                      <div className="pt-0.5">
                        {apiKeys[model.id as keyof typeof apiKeys] ? <Unlock className="h-2 w-2 text-primary" /> : <Lock className="h-2 w-2 text-white/5" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                    <div className="relative">
                      <Input 
                        type="password"
                        placeholder="sk-..."
                        value={apiKeys[model.id as keyof typeof apiKeys]}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, [model.id]: e.target.value }))}
                        className="bg-black/60 border-white/5 rounded-md h-7 text-[8px] font-mono text-primary pr-7"
                      />
                      <Key className="absolute right-2 top-2 h-3 w-3 text-white/5 pointer-events-none" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex gap-2">
               <ShieldAlert className="h-3.5 w-3.5 text-primary shrink-0" />
               <p className="text-[7px] text-white/30 leading-relaxed uppercase tracking-tighter">
                 <span className="text-primary font-bold">BYOK_PROTOCOL:</span> Suas chaves são persistidas apenas localmente (`localStorage`). Você financia diretamente o uso junto aos provedores de IA.
               </p>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-3">
             <Card className="glass-panel rounded-lg p-3 space-y-3 border-white/5">
                <div className="flex items-center gap-2">
                   <div className="p-1 bg-white/5 rounded border border-white/10 text-white/40">
                      <Github className="h-3.5 w-3.5" />
                   </div>
                   <h3 className="text-[9px] font-headline font-bold uppercase tracking-[0.2em] text-white italic">GitHub_Pipeline</h3>
                </div>
                <div className="space-y-2">
                   <div className="space-y-1">
                      <label className="text-[6px] font-black uppercase tracking-widest text-white/20 ml-1">Access_Token (PAT)</label>
                      <Input 
                        type="password" 
                        placeholder="ghp_..." 
                        value={githubToken} 
                        onChange={(e) => setGithubToken(e.target.value)}
                        className="bg-black/40 border-white/5 rounded-md h-7 text-[8px] font-mono" 
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[6px] font-black uppercase tracking-widest text-white/20 ml-1">GH_Username</label>
                        <Input placeholder="user" value={githubUser} onChange={(e) => setGithubUser(e.target.value)} className="bg-black/40 border-white/5 rounded-md h-7 text-[8px]" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[6px] font-black uppercase tracking-widest text-white/20 ml-1">Repo_Path</label>
                        <Input placeholder="repo" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} className="bg-black/40 border-white/5 rounded-md h-7 text-[8px]" />
                      </div>
                   </div>
                </div>
             </Card>

             <Card className="glass-panel rounded-lg p-3 border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Database className="h-3 w-3 text-primary" />
                   <span className="text-[8px] font-bold uppercase tracking-widest text-white/40 italic">Supabase_Vault_Link</span>
                </div>
                <span className="text-[6px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">CONNECTED</span>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}