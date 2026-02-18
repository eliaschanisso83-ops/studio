
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  Key
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
    toast({ title: "Core Protocols Updated", description: "Your local security tokens have been stored." });
    setTimeout(() => setIsSaved(false), 2000);
  };

  const aiModels = [
    { id: 'gemini', name: 'Gemini 2.5', icon: Zap, provider: 'Google AI' },
    { id: 'gpt4', name: 'GPT-4o', icon: BrainCircuit, provider: 'OpenAI' },
    { id: 'claude', name: 'Claude 3.5', icon: Bot, provider: 'Anthropic' },
    { id: 'copilot', name: 'Copilot', icon: Github, provider: 'Microsoft' },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-foreground font-body pb-20 md:pb-0">
      <header className="h-20 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-6 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-11 w-11 text-white/40 hover:text-white rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl tracking-tighter uppercase italic">System_Config</h1>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-headline font-bold h-11 px-6 rounded-xl glow-primary">
          {isSaved ? <CheckCircle2 className="h-4 w-4" /> : 'Apply'}
        </Button>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12 space-y-10">
        <Tabs defaultValue="ai" className="w-full space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-16 w-full justify-start overflow-x-auto">
            <TabsTrigger value="ai" className="gap-2 rounded-xl px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black">
              Neural Cores
            </TabsTrigger>
            <TabsTrigger value="github" className="gap-2 rounded-xl px-8 font-bold text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black">
              Cloud Sync
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiModels.map((model) => (
                <Card key={model.id} className={`glass-panel rounded-3xl transition-all ${selectedModel === model.id ? 'ring-2 ring-primary border-primary/20' : ''}`} onClick={() => setSelectedModel(model.id)}>
                  <CardHeader className="flex flex-row items-center justify-between p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-2xl bg-black border border-white/10 ${selectedModel === model.id ? 'text-primary' : 'text-white/20'}`}>
                        <model.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-headline font-bold">{model.name}</CardTitle>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest">{model.provider}</p>
                      </div>
                    </div>
                    {apiKeys[model.id as keyof typeof apiKeys] ? <Unlock className="h-4 w-4 text-primary" /> : <Lock className="h-4 w-4 text-white/10" />}
                  </CardHeader>
                  <CardContent className="p-6 pt-0 space-y-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-white/20">API Key Protocol</label>
                      <Input 
                        type="password"
                        placeholder="sk-..."
                        value={apiKeys[model.id as keyof typeof apiKeys]}
                        onChange={(e) => setApiKeys(prev => ({ ...prev, [model.id]: e.target.value }))}
                        className="bg-black/60 border-white/10 rounded-xl h-12 text-sm font-mono text-primary"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/10 flex gap-4">
               <Key className="h-6 w-6 text-red-500 shrink-0" />
               <p className="text-xs text-white/40 leading-relaxed">
                 <span className="text-red-500 font-bold">BYOK Protocol:</span> All processing happens via your personal accounts. AIGameForge does not provide AI credits. Your keys are stored locally on this device only.
               </p>
            </div>
          </TabsContent>

          <TabsContent value="github" className="space-y-6">
             <Card className="glass-panel rounded-3xl p-8 space-y-8">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      <Github className="h-6 w-6 text-white" />
                   </div>
                   <h3 className="text-xl font-headline font-bold">Cloud Repository</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Personal Access Token</label>
                      <Input 
                        type="password" 
                        placeholder="ghp_..." 
                        value={githubToken} 
                        onChange={(e) => setGithubToken(e.target.value)}
                        className="bg-black/60 border-white/10 rounded-xl h-14" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Username</label>
                      <Input placeholder="github_user" value={githubUser} onChange={(e) => setGithubUser(e.target.value)} className="bg-black/60 border-white/10 rounded-xl h-14" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/20">Repository</label>
                      <Input placeholder="my-game-repo" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} className="bg-black/60 border-white/10 rounded-xl h-14" />
                   </div>
                </div>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
