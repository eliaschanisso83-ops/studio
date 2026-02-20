
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Settings, 
  Clock, 
  Trash2, 
  LayoutGrid,
  Code,
  HardDrive,
  Cloud,
  CloudUpload,
  Gamepad2,
  FileCode,
  Download
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { Logo } from '@/components/logo';
import { supabase } from '@/lib/supabase';
import { PWAInstallButton } from '@/components/pwa-install-button';

export default function Dashboard() {
  const [localProjects, setLocalProjects] = useState<any[]>([]);
  const [cloudProjects, setCloudProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      loadLocalProjects();
      if (session?.user) loadCloudProjects();
      setIsLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) loadCloudProjects();
      else setCloudProjects([]);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadLocalProjects = () => {
    const saved = localStorage.getItem('forge_projects');
    if (saved) {
      setLocalProjects(JSON.parse(saved));
    } else {
      setLocalProjects([]);
    }
  };

  const loadCloudProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setCloudProjects(data || []);
  };

  const syncToCloud = async (project: any) => {
    if (!user) {
      toast({ variant: "destructive", title: "AUTH_REQUIRED", description: "Faça login para sincronizar com o Cloud Vault." });
      return;
    }

    const { error } = await supabase.from('projects').insert([{
      user_id: user.id,
      title: project.title,
      type: project.type,
      image_url: project.img || 'https://picsum.photos/seed/game/300/200',
      script_content: project.script || ""
    }]);

    if (!error) {
      toast({ title: "CLOUD_SYNC_SUCCESS", description: "Projeto enviado para o cofre seguro." });
      loadCloudProjects();
    } else {
      toast({ variant: "destructive", title: "SYNC_ERROR", description: error.message });
    }
  };

  const deleteProject = async (id: string, isCloud = false) => {
    if (isCloud) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) {
        loadCloudProjects();
        toast({ title: "CLOUD_DELETED", description: "Projeto removido do servidor." });
      }
    } else {
      const updated = localProjects.filter(p => p.id !== id);
      setLocalProjects(updated);
      localStorage.setItem('forge_projects', JSON.stringify(updated));
      toast({ title: "LOCAL_DELETED", description: "Dados expurgados do dispositivo." });
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-foreground flex flex-col font-body pb-24 md:pb-0 scanline">
      <header className="h-12 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Logo size={24} showText={false} />
          <div>
            <h1 className="font-headline font-bold text-[10px] tracking-tighter uppercase">FORGE<span className="text-primary">.AI</span></h1>
            <div className="flex items-center gap-1 mt-0.5">
               <div className={`h-1 w-1 rounded-full animate-pulse ${user ? 'bg-green-500' : 'bg-white/20'}`} />
               <span className="text-[6px] font-bold uppercase text-white/20">{user ? 'Cloud_Vault_Link' : 'Local_Only_Mode'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <PWAInstallButton variant="ghost" size="icon" showIconOnly className="h-7 w-7 text-primary/40" />
          <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-white/40 hover:text-white">
            <Link href="/settings">
              <Settings className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <div className="w-7 h-7 rounded bg-gradient-to-tr from-primary/20 to-accent/20 p-px">
            <div className="w-full h-full rounded bg-black flex items-center justify-center font-bold text-primary text-[7px]">
              {user ? user.email.substring(0,2).toUpperCase() : '??'}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-3 md:p-6 max-w-5xl mx-auto w-full space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-3 w-3 text-white/20" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 italic">Filesystem_Root</h2>
          </div>
          <Button asChild size="sm" className="bg-primary text-black font-headline font-bold h-7 px-3 text-[8px] uppercase neo-button">
            <Link href="/editor/new">
              <Plus className="mr-1 h-3 w-3" /> Synthesis_Genesis
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="local" className="w-full">
          <TabsList className="bg-white/5 border border-white/5 p-0.5 rounded h-8 mb-4">
            <TabsTrigger value="local" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded px-4 font-bold text-[8px] uppercase h-full">Library_Local ({localProjects.length})</TabsTrigger>
            <TabsTrigger value="cloud" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded px-4 font-bold text-[8px] uppercase h-full">Cloud_Vault ({cloudProjects.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {localProjects.length === 0 ? (
              <div className="col-span-full py-16 text-center border border-dashed border-white/5 rounded-2xl">
                <Gamepad2 className="h-8 w-8 text-white/5 mx-auto mb-3" />
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Nenhum projeto forjado localmente</p>
              </div>
            ) : (
              localProjects.map((p) => (
                <Card key={p.id} className="glass-panel group overflow-hidden border-white/5 rounded-xl flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                    <Image src={p.img || 'https://picsum.photos/seed/game/300/200'} alt={p.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute top-1.5 right-1.5 flex gap-1.5">
                      <Button onClick={() => syncToCloud(p)} size="icon" className="h-6 w-6 bg-black/80 border border-white/10 text-primary hover:bg-primary hover:text-black rounded-md">
                        <CloudUpload className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="p-2 pb-1 space-y-0">
                    <CardTitle className="font-headline font-bold text-[10px] text-white uppercase italic truncate">{p.title}</CardTitle>
                    <span className="text-[7px] font-black text-white/20 uppercase">{p.type}</span>
                  </CardHeader>
                  <CardFooter className="p-2 pt-1 flex justify-between items-center mt-auto border-t border-white/5">
                    <div className="flex items-center text-white/20 text-[6px] font-bold uppercase"><Clock className="h-2 w-2 mr-1" /> Local</div>
                    <div className="flex gap-1.5">
                      <Button onClick={() => deleteProject(p.id)} variant="ghost" size="icon" className="h-5 w-5 text-white/10 hover:text-destructive hover:bg-destructive/10 rounded-md"><Trash2 className="h-3 w-3" /></Button>
                      <Button asChild size="icon" className="h-5 w-5 bg-primary/5 text-primary hover:bg-primary hover:text-black rounded-md">
                        <Link href={`/editor/${p.id}`}><Code className="h-3 w-3" /></Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              )
            ))}
          </TabsContent>

          <TabsContent value="cloud" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {!user ? (
              <div className="col-span-full py-20 text-center space-y-4 glass-panel rounded-2xl border-dashed">
                <Cloud className="h-10 w-10 text-white/5 mx-auto" />
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Protocolo de Nuvem Inativo</p>
                <Button asChild variant="outline" size="sm" className="h-8 text-[8px] uppercase border-white/10 hover:bg-primary/10">
                  <Link href="/auth">Authenticate_Identity</Link>
                </Button>
              </div>
            ) : cloudProjects.length === 0 ? (
              <div className="col-span-full py-16 text-center text-white/10 text-[8px] font-bold uppercase">Cloud_Vault Vazio</div>
            ) : (
              cloudProjects.map((p) => (
                <Card key={p.id} className="glass-panel group overflow-hidden border-white/5 rounded-xl flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                    <Image src={p.image_url || 'https://picsum.photos/seed/cloud/300/200'} alt={p.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="p-2 pb-1 space-y-0">
                    <CardTitle className="font-headline font-bold text-[10px] text-primary uppercase italic truncate">{p.title}</CardTitle>
                    <span className="text-[7px] font-black text-white/20 uppercase">{p.type}</span>
                  </CardHeader>
                  <CardFooter className="p-2 pt-1 flex justify-between items-center mt-auto border-t border-white/5">
                    <div className="flex items-center text-primary text-[6px] font-bold uppercase"><Cloud className="h-2 w-2 mr-1" /> Secure_Storage</div>
                    <div className="flex gap-1.5">
                      <Button onClick={() => deleteProject(p.id, true)} variant="ghost" size="icon" className="h-5 w-5 text-white/10 hover:text-destructive hover:bg-destructive/10 rounded-md"><Trash2 className="h-3 w-3" /></Button>
                      <Button asChild size="icon" className="h-5 w-5 bg-primary/20 text-primary rounded-md">
                        <Link href={`/editor/${p.id}`}><Code className="h-3 w-3" /></Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-12 bg-black/95 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 md:hidden z-[100]">
        <Link href="/dashboard" className="text-primary flex flex-col items-center gap-0.5">
          <LayoutGrid className="h-4 w-4" />
          <span className="text-[6px] font-bold uppercase tracking-[0.3em]">Home</span>
        </Link>
        <Link href="/editor/new" className="bg-primary p-2.5 rounded-xl -translate-y-4 shadow-2xl shadow-primary/20 text-black active:scale-90 transition-transform">
          <Plus className="h-5 w-5" />
        </Link>
        <Link href="/settings" className="text-white/30 flex flex-col items-center gap-0.5">
          <Settings className="h-4 w-4" />
          <span className="text-[6px] font-bold uppercase tracking-[0.3em]">Config</span>
        </Link>
      </nav>
    </div>
  );
}
