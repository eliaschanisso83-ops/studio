
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
  Database,
  ExternalLink,
  LogOut,
  Mail,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
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

    // Check Supabase Auth
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSave = () => {
    localStorage.setItem('gh_token', githubToken);
    localStorage.setItem('gh_user', githubUser);
    localStorage.setItem('gh_repo', githubRepo);
    localStorage.setItem('selected_ai_model', selectedModel);
    localStorage.setItem('ai_api_keys', JSON.stringify(apiKeys));
    setIsSaved(true);
    toast({ title: "PROTOCOLOS_ATUALIZADOS", description: "Configurações persistidas localmente." });
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSignUp = async () => {
    setIsAuthLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      toast({ variant: "destructive", title: "AUTH_ERROR", description: error.message });
    } else {
      toast({ title: "VERIFIQUE_EMAIL", description: "Link de ativação enviado." });
    }
    setIsAuthLoading(false);
  };

  const handleSignIn = async () => {
    setIsAuthLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ variant: "destructive", title: "AUTH_ERROR", description: error.message });
    } else {
      toast({ title: "SESSÃO_INICIADA", description: "Conexão com Cloud Vault estabelecida." });
    }
    setIsAuthLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({ title: "SESSÃO_ENCERRADA", description: "Cloud Vault desconectado." });
  };

  const clearKey = (id: string) => {
    const updatedKeys = { ...apiKeys, [id]: '' };
    setApiKeys(updatedKeys);
    localStorage.setItem('ai_api_keys', JSON.stringify(updatedKeys));
    toast({ 
      variant: "destructive", 
      title: "CHAVE_REMOVIDA", 
      description: `A credencial do ${id.toUpperCase()} foi expurgada.` 
    });
  };

  const aiModels = [
    { id: 'gemini', name: 'Gemini 2.5', icon: Zap, provider: 'Google AI', link: 'https://aistudio.google.com/app/apikey' },
    { id: 'gpt4', name: 'GPT-4o', icon: BrainCircuit, provider: 'OpenAI', link: 'https://platform.openai.com/api-keys' },
    { id: 'claude', name: 'Claude 3.5', icon: Bot, provider: 'Anthropic', link: 'https://console.anthropic.com/settings/keys' },
    { id: 'copilot', name: 'Copilot', icon: Github, provider: 'Microsoft', link: 'https://github.com/settings/tokens' },
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
            <TabsTrigger value="ai" className="gap-2 rounded px-3 font-bold text-[7px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black h-full">Neural_Core</TabsTrigger>
            <TabsTrigger value="github" className="gap-2 rounded px-3 font-bold text-[7px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black h-full">Cloud_Link</TabsTrigger>
            <TabsTrigger value="auth" className="gap-2 rounded px-3 font-bold text-[7px] uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-black h-full">User_Identity</TabsTrigger>
          </TabsList>

          <TabsContent value="ai" className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {aiModels.map((model) => (
                <Card 
                  key={model.id} 
                  onClick={() => setSelectedModel(model.id)}
                  className={`glass-panel rounded-lg transition-all border-white/5 cursor-pointer ${selectedModel === model.id ? 'ring-1 ring-primary/30 bg-primary/[0.02]' : ''}`}
                >
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
                    {apiKeys[model.id as keyof typeof apiKeys] && (
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); clearKey(model.id); }} className="h-4 w-4 text-white/10 hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="h-2.5 w-2.5" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="p-2 pt-0">
                    <Input 
                      type="password"
                      placeholder="sk-..."
                      value={apiKeys[model.id as keyof typeof apiKeys]}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, [model.id]: e.target.value }))}
                      className="bg-black/60 border-white/5 rounded-md h-7 text-[8px] font-mono text-primary"
                    />
                    <a href={model.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[6px] font-bold text-primary/40 hover:text-primary uppercase mt-1 w-fit">
                      <ExternalLink className="h-2 w-2" /> Gerar Chave
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex gap-2">
               <ShieldAlert className="h-3.5 w-3.5 text-primary shrink-0" />
               <p className="text-[7px] text-white/30 uppercase tracking-tighter">BYOK_PROTOCOL: Suas chaves são persistidas apenas localmente.</p>
            </div>
          </TabsContent>

          <TabsContent value="auth" className="space-y-3">
            {user ? (
              <Card className="glass-panel border-white/5 p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <User className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-white uppercase">{user.email}</h3>
                    <p className="text-[7px] text-white/20 uppercase">Status: AUTH_VERIFIED</p>
                  </div>
                </div>
                <Button onClick={handleSignOut} variant="ghost" className="w-full h-8 text-destructive hover:bg-destructive/10 text-[9px] font-bold uppercase">
                  <LogOut className="mr-2 h-3.5 w-3.5" /> Encerrar Sessão
                </Button>
              </Card>
            ) : (
              <Card className="glass-panel border-white/5 p-6 space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-2.5 top-2 h-4 w-4 text-white/20" />
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-black/40 border-white/5 pl-9 h-9 text-[10px]" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2 h-4 w-4 text-white/20" />
                    <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-black/40 border-white/5 pl-9 h-9 text-[10px]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={handleSignIn} disabled={isAuthLoading} className="bg-primary text-black font-bold h-9 text-[9px] uppercase">Acessar Vault</Button>
                  <Button onClick={handleSignUp} disabled={isAuthLoading} variant="outline" className="border-white/10 text-white font-bold h-9 text-[9px] uppercase">Nova Identidade</Button>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="github" className="space-y-3">
             <Card className="glass-panel rounded-lg p-3 space-y-3 border-white/5">
                <div className="flex items-center gap-2">
                   <Github className="h-3.5 w-3.5 text-white/40" />
                   <h3 className="text-[9px] font-headline font-bold uppercase text-white italic">GitHub_Pipeline</h3>
                </div>
                <div className="space-y-2">
                   <Input type="password" placeholder="Access_Token (PAT)" value={githubToken} onChange={(e) => setGithubToken(e.target.value)} className="bg-black/40 border-white/5 rounded-md h-7 text-[8px] font-mono" />
                   <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="GH_Username" value={githubUser} onChange={(e) => setGithubUser(e.target.value)} className="bg-black/40 border-white/5 h-7 text-[8px]" />
                      <Input placeholder="Repo_Path" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} className="bg-black/40 border-white/5 h-7 text-[8px]" />
                   </div>
                </div>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
