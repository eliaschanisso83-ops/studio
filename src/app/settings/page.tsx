"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Key, Shield, User, Globe, Github, Info, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [githubToken, setGithubToken] = useState('');
  const [githubUser, setGithubUser] = useState('');
  const [githubRepo, setGithubRepo] = useState('');

  useEffect(() => {
    // Carregar do localStorage se existir
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
        <Tabs defaultValue="github" className="space-y-8">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl h-14 w-full justify-start overflow-x-auto overflow-y-hidden">
            <TabsTrigger value="github" className="gap-2 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-black"><Github className="h-4 w-4"/> GitHub Integration</TabsTrigger>
            <TabsTrigger value="api" className="gap-2 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-black"><Key className="h-4 w-4"/> AI Engine Keys</TabsTrigger>
            <TabsTrigger value="profile" className="gap-2 rounded-lg px-6 font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-black"><User className="h-4 w-4"/> User_Identity</TabsTrigger>
          </TabsList>

          <TabsContent value="github">
            <Card className="glass-card border-white/5 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-headline font-bold text-2xl text-white">Cloud Forge Sync</CardTitle>
                </div>
                <CardDescription className="text-white/40">
                  Connect your GitHub account to push projects directly to your repositories.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">GitHub Personal Access Token</label>
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
                    <p className="text-[9px] text-white/20">Necessário escopo 'repo' para enviar arquivos.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Default Owner (Username)</label>
                      <Input 
                        placeholder="ex: johndoe" 
                        value={githubUser} 
                        onChange={(e) => setGithubUser(e.target.value)}
                        className="bg-white/5 border-white/10 focus-visible:ring-primary text-white" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Target Repository Name</label>
                      <Input 
                        placeholder="ex: my-ai-game" 
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
                     AIGameForge não armazena seu token permanentemente em servidores. Ele é usado apenas durante a sessão de sincronização.
                   </p>
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 p-6 justify-between items-center">
                <p className="text-[9px] font-mono text-white/20">SECURE_TUNNEL: ACTIVE</p>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-headline font-bold px-8 h-12 neo-button rounded-xl">
                  {isSaved ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Config_Stored</> : 'Commit_Changes'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <Card className="glass-card border-white/5 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="font-headline font-bold text-2xl text-white">Neural Engine Keys</CardTitle>
                <CardDescription className="text-white/40">Manage your connections to AI providers.</CardDescription>
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
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">API Interface Key</label>
                    <div className="flex gap-2">
                      <Input type="password" value="••••••••••••••••••••••••" readOnly className="bg-white/5 border-white/10 text-white font-mono flex-1" />
                      <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest px-6">Update</Button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl flex gap-4">
                   <AlertTriangle className="h-5 w-5 text-accent shrink-0" />
                   <p className="text-[11px] text-white/60 leading-relaxed">
                     Token depletion warning: High-frequency game forging can consume quotas rapidly. Monitor your provider console.
                   </p>
                </div>
              </CardContent>
              <CardFooter className="bg-white/5 p-6 justify-end">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-headline font-bold px-8 h-12 neo-button rounded-xl">
                  Store_Keys
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="glass-card border-white/5 rounded-2xl overflow-hidden">
              <CardHeader className="p-8 border-b border-white/5">
                <CardTitle className="font-headline font-bold text-2xl text-white">Forge_Identity</CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                 <div className="flex items-center gap-8">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-px">
                      <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center font-headline font-bold text-3xl text-primary border border-white/5">
                        JD
                      </div>
                    </div>
                    <Button variant="outline" className="border-white/10 text-white hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest px-6">Update_Avatar</Button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Display_Alias</label>
                       <Input defaultValue="John Doe" className="bg-white/5 border-white/10 text-white" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Comm_Channel (Email)</label>
                       <Input defaultValue="john@example.com" disabled className="bg-white/5 border-white/10 text-white/30" />
                    </div>
                 </div>
              </CardContent>
              <CardFooter className="bg-white/5 p-6 justify-end gap-4">
                <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive font-bold uppercase text-[10px] tracking-widest">Terminate_Session</Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-headline font-bold px-8 h-12 neo-button rounded-xl">Save_Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
