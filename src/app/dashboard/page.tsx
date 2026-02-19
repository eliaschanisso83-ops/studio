
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
  RefreshCcw,
  CloudUpload
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { Logo } from '@/components/logo';
import { supabase } from '@/lib/supabase';

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
  }, []);

  const loadLocalProjects = () => {
    const saved = localStorage.getItem('forge_projects');
    if (saved) {
      setLocalProjects(JSON.parse(saved));
    } else {
      const defaultProjects = [
        { id: '1', title: 'Cyber Drift', type: 'Racing 2D', date: 'Local', status: 'Active', img: 'https://picsum.photos/seed/cyber/300/200' },
      ];
      setLocalProjects(defaultProjects);
      localStorage.setItem('forge_projects', JSON.stringify(defaultProjects));
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
      toast({ variant: "destructive", title: "AUTH_REQUIRED", description: "Faça login para usar o Cloud Vault." });
      return;
    }

    const { error } = await supabase.from('projects').insert([{
      user_id: user.id,
      title: project.title,
      type: project.type,
      image_url: project.img,
      script_content: project.script || ""
    }]);

    if (!error) {
      toast({ title: "CLOUD_SYNC_OK", description: "Projeto forjado no servidor." });
      loadCloudProjects();
    } else {
      toast({ variant: "destructive", title: "SYNC_ERROR", description: error.message });
    }
  };

  const deleteProject = (id: string, isCloud = false) => {
    if (isCloud) {
      // Logic for cloud delete
      supabase.from('projects').delete().eq('id', id).then(() => loadCloudProjects());
    } else {
      const updated = localProjects.filter(p => p.id !== id);
      setLocalProjects(updated);
      localStorage.setItem('forge_projects', JSON.stringify(updated));
    }
    toast({ variant: "destructive", title: "ITEM_REMOVIDO", description: "Dados expurgados com sucesso." });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-foreground flex flex-col font-body pb-24 md:pb-0 scanline">
      <header className="h-12 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Logo size={24} showText={false} />
          <div>
            <h1 className="font-headline font-bold text-[10px] tracking-tighter">FORGE<span className="text-primary">.AI</span></h1>
            <div className="flex items-center gap-1 mt-0.5">
               <div className={`h-1 w-1 rounded-full animate-pulse ${user ? 'bg-green-500' : 'bg-white/20'}`} />
               <span className="text-[6px] font-bold uppercase text-white/20">{user ? 'Cloud_Sync_Active' : 'Local_Mode_Only'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href="/settings"><Button variant="ghost" size="icon" className="h-7 w-7 text-white/40"><Settings className="h-3.5 w-3.5" /></Button></Link>
          <div className="w-7 h-7 rounded bg-gradient-to-tr from-primary/20 to-accent/20 p-px">
            <div className="w-full h-full rounded bg-black flex items-center justify-center font-bold text-primary text-[7px]">
              {user ? user.email.substring(0,2).toUpperCase() : '??'}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-3 md:p-6 max-w-5xl mx-auto w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-3 w-3 text-white/20" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 italic">Filesystem</h2>
          </div>
          <Link href="/editor/new">
            <Button size="sm" className="bg-primary text-black font-headline font-bold h-7 px-3 text-[8px] uppercase neo-button"><Plus className="mr-1 h-3 w-3" /> Genesis</Button>
          </Link>
        </div>

        <Tabs defaultValue="local" className="w-full">
          <TabsList className="bg-white/5 border border-white/5 p-0.5 rounded h-7 mb-3">
            <TabsTrigger value="local" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded px-3 font-bold text-[7px] uppercase h-full">Library_Local</TabsTrigger>
            <TabsTrigger value="cloud" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded px-3 font-bold text-[7px] uppercase h-full">Cloud_Vault</TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {localProjects.map((p) => (
              <Card key={p.id} className="glass-panel group overflow-hidden border-white/5 rounded-lg flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-1 right-1 flex gap-1">
                    <Button onClick={() => syncToCloud(p)} size="icon" className="h-5 w-5 bg-black/80 border border-white/10 text-primary hover:bg-primary hover:text-black">
                      <CloudUpload className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-1.5 pb-0.5 space-y-0">
                  <CardTitle className="font-headline font-bold text-[9px] text-white uppercase italic">{p.title}</CardTitle>
                  <span className="text-[6px] font-black text-white/20 uppercase">{p.type}</span>
                </CardHeader>
                <CardFooter className="p-1.5 pt-0.5 flex justify-between items-center mt-auto border-t border-white/5">
                  <div className="flex items-center text-white/20 text-[5px] font-bold uppercase"><Clock className="h-1.5 w-1.5 mr-1" /> Local</div>
                  <div className="flex gap-1">
                    <Button onClick={() => deleteProject(p.id)} variant="ghost" size="icon" className="h-4 w-4 text-white/10 hover:text-destructive"><Trash2 className="h-2.5 w-2.5" /></Button>
                    <Link href={`/editor/${p.id}`}><Button size="icon" className="h-4 w-4 bg-primary/5 text-primary hover:bg-primary hover:text-black"><Code className="h-2.5 w-2.5" /></Button></Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="cloud" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {!user ? (
              <div className="col-span-full py-12 text-center space-y-3">
                <Cloud className="h-8 w-8 text-white/10 mx-auto" />
                <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Acesso Restrito: Identidade Necessária</p>
                <Link href="/settings"><Button variant="outline" size="sm" className="h-7 text-[8px] uppercase border-white/10">Login_Protocol</Button></Link>
              </div>
            ) : cloudProjects.length === 0 ? (
              <div className="col-span-full py-12 text-center text-white/10 text-[8px] font-bold uppercase">Nenhum dado no Vault</div>
            ) : (
              cloudProjects.map((p) => (
                <Card key={p.id} className="glass-panel group overflow-hidden border-white/5 rounded-lg flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image_url || 'https://picsum.photos/seed/cloud/300/200'} alt={p.title} fill className="object-cover" />
                  </div>
                  <CardHeader className="p-1.5 pb-0.5 space-y-0">
                    <CardTitle className="font-headline font-bold text-[9px] text-primary uppercase italic">{p.title}</CardTitle>
                    <span className="text-[6px] font-black text-white/20 uppercase">{p.type}</span>
                  </CardHeader>
                  <CardFooter className="p-1.5 pt-0.5 flex justify-between items-center mt-auto border-t border-white/5">
                    <div className="flex items-center text-primary text-[5px] font-bold uppercase"><Cloud className="h-1.5 w-1.5 mr-1" /> Cloud_Vault</div>
                    <div className="flex gap-1">
                      <Button onClick={() => deleteProject(p.id, true)} variant="ghost" size="icon" className="h-4 w-4 text-white/10 hover:text-destructive"><Trash2 className="h-2.5 w-2.5" /></Button>
                      <Link href={`/editor/${p.id}`}><Button size="icon" className="h-4 w-4 bg-primary/20 text-primary"><Code className="h-2.5 w-2.5" /></Button></Link>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-12 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 md:hidden z-[100]">
        <Link href="/dashboard" className="text-primary flex flex-col items-center gap-0.5">
          <LayoutGrid className="h-3.5 w-3.5" />
          <span className="text-[6px] font-bold uppercase tracking-[0.3em]">Home</span>
        </Link>
        <Link href="/editor/new" className="bg-primary p-2 rounded-md -translate-y-3 shadow-xl text-black">
          <Plus className="h-4 w-4" />
        </Link>
        <Link href="/settings" className="text-white/20 flex flex-col items-center gap-0.5">
          <Settings className="h-3.5 w-3.5" />
          <span className="text-[6px] font-bold uppercase tracking-[0.3em]">Protocol</span>
        </Link>
      </nav>
    </div>
  );
}
