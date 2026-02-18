"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Key, User, Github, Info, AlertTriangle, CheckCircle2, Zap, ExternalLink, StepForward } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [githubUser, setGithubUser] = useState('');
  const [githubRepo, setGithubRepo] = useState('');

  useEffect(() => {
    setGithubToken(localStorage.getItem('gh_token') || '');
    setGithubUser(localStorage.getItem('gh_user') || '');
    setGithubRepo(localStorage.getItem('gh_repo') || '');
  }, []);

  const handleSave = () => {
    localStorage.setItem('gh_token', githubToken);
    localStorage.setItem('gh_user', githubUser);
    localStorage.setItem('gh_repo', githubRepo);
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

      <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-2">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Guia de Conexão</h2>
              <p className="text-xs text-white/40 leading-relaxed">Siga estes passos para habilitar o Cloud Sync.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { step: "01", text: "Gere um Classic Token no GitHub com escopo 'repo'.", link: "https://github.com/settings/tokens" },
                { step: "02", text: "Crie um repositório vazio no seu perfil do GitHub.", link: "https://github.com/new" },
                { step: "03", text: "Preencha os dados ao lado e clique em 'Commit Changes'.", link: null }
              ].map((s, i) => (
                <div key={i} className="flex gap-4 items-start p-3 rounded-xl bg-white/5 border border-white/5">
                  <span className="font-mono text-[10px] text-primary font-bold">{s.step}</span>
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/60 font-medium">{s.text}</p>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-[9px] text-primary flex items-center gap-1 hover:underline">
                        Abrir Link <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <Tabs defaultValue="github" className="space-y-8">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl h-14 w-full justify-start overflow-x-auto overflow-y-hidden">
                <TabsTrigger value="github" className="gap-2 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-black">
                  <Github className="h-4 w-4"/> GitHub_Sync
                </TabsTrigger>
                <TabsTrigger value="api" className="gap-2 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-black">
                  <Key className="h-4 w-4"/> Engine_Keys
                </TabsTrigger>
              </TabsList>

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

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex gap-4">
                       <Info className="h-5 w-5 text-primary shrink-0" />
                       <p className="text-[11px] text-white/60 leading-relaxed italic">
                         Seus dados são armazenados localmente no seu navegador e nunca tocam nossos servidores, exceto para realizar a sincronização via API do GitHub.
                       </p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-white/5 p-6 justify-between items-center">
                    <p className="text-[9px] font-mono text-white/20 uppercase">Encryption: AES-256 (Local)</p>
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-headline font-bold px-8 h-12 neo-button rounded-xl">
                      {isSaved ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Config_Stored</> : 'Commit_Changes'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="m-0">
                <Card className="glass-card border-white/5 rounded-2xl overflow-hidden">
                  <CardHeader className="p-8 border-b border-white/5">
                    <CardTitle className="font-headline font-bold text-2xl text-white">Neural Engine</CardTitle>
                    <CardDescription className="text-white/40">Status dos modelos de IA generativa.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2.5 rounded-lg">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">Gemini 2.5 Flash</p>
                          <p className="text-[10px] text-primary uppercase tracking-widest font-black">Connected_Status: Online</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl flex gap-4">
                       <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
                       <p className="text-[11px] text-white/60 leading-relaxed">
                         O uso intensivo da IA pode esgotar suas cotas diárias rapidamente. Monitore seu console do Google Cloud.
                       </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}