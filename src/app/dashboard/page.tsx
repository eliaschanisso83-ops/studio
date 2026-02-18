"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Plus, 
  Settings, 
  Clock, 
  Trash2, 
  LayoutGrid,
  Database,
  Cloud,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      // Mock data representing local projects
      const mockProjects = [
        { id: '1', title: 'Cyber Drift', type: 'Racing 2D', date: '2h ago', status: 'Active', img: 'https://picsum.photos/seed/cyber/400/250' },
        { id: '2', title: 'Neon Slash', type: 'Action RPG', date: '1d ago', status: 'Draft', img: 'https://picsum.photos/seed/neon/400/250' },
        { id: '3', title: 'Star Void', type: 'Space Shooter', date: '3d ago', status: 'Active', img: 'https://picsum.photos/seed/star/400/250' },
      ];
      setProjects(mockProjects);
      setIsLoading(false);
    }
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-foreground flex flex-col font-body pb-24 md:pb-0">
      <header className="h-16 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-1.5 rounded-lg border border-primary/20">
            <Gamepad2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-base tracking-tighter leading-none">
              FORGE<span className="text-primary">.AI</span>
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
               <div className="flex items-center gap-1 bg-green-500/10 px-1 py-0.5 rounded border border-green-500/20">
                 <Database className="h-2 w-2 text-green-500" />
                 <span className="text-[7px] font-bold text-green-500 uppercase tracking-widest">Supabase_Link</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-lg text-white/40 hover:text-white hover:bg-white/5 h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-primary/40 to-accent/40 p-px">
            <div className="w-full h-full rounded-lg bg-black flex items-center justify-center font-bold text-primary text-[10px] border border-white/5">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-headline font-bold text-white tracking-tight">Cores_Library</h2>
            <p className="text-white/30 text-[10px] uppercase font-black tracking-widest">Local Repository v2.5</p>
          </div>
          <Link href="/editor/new">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-headline font-bold h-10 px-4 rounded-xl shadow-lg glow-primary">
              <Plus className="mr-1.5 h-4 w-4" /> Genesis
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl h-11 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-lg px-4 font-bold text-[9px] uppercase tracking-widest">Local_Cache</TabsTrigger>
            <TabsTrigger value="cloud" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-lg px-4 font-bold text-[9px] uppercase tracking-widest">Cloud_Vault</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 m-0">
            {isLoading ? (
              Array.from({length: 4}).map((_, i) => (
                <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5 animate-pulse border border-white/5" />
              ))
            ) : (
              projects.map((p) => (
                <Card key={p.id} className="glass-panel group overflow-hidden border-white/5 hover:border-primary/40 transition-all duration-300 rounded-2xl flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint="game thumbnail"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Link href={`/editor/${p.id}`}>
                        <Button size="sm" className="rounded-lg font-bold bg-white text-black h-8 px-4 text-[9px] uppercase tracking-widest">
                          OPEN
                        </Button>
                      </Link>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="text-[7px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/10 text-primary">
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="p-3 pb-1 space-y-0.5">
                    <CardTitle className="font-headline font-bold text-sm text-white truncate">{p.title}</CardTitle>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-black text-white/30 uppercase tracking-tighter truncate">{p.type}</span>
                    </div>
                  </CardHeader>
                  <CardFooter className="p-3 pt-2 flex justify-between items-center mt-auto border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center text-white/20 text-[8px] font-bold uppercase tracking-tighter">
                      <Clock className="h-2.5 w-2.5 mr-1" />
                      {p.date}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-white/20 hover:text-destructive hover:bg-destructive/10 rounded-md">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Link href={`/editor/${p.id}`}>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-primary/40 hover:text-primary hover:bg-primary/10 rounded-md">
                          <ChevronRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
            
            <Link href="/editor/new">
              <div className="border border-dashed border-white/10 rounded-2xl aspect-[4/5] flex flex-col items-center justify-center p-4 text-center space-y-3 hover:bg-white/5 hover:border-primary/30 transition-all group relative">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all">
                  <Plus className="h-5 w-5 text-white/20 group-hover:text-primary" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-headline font-bold text-[10px] text-white uppercase italic">NEW_GENESIS</h3>
                  <p className="text-[7px] text-white/20 font-medium uppercase tracking-widest">Forge new reality</p>
                </div>
              </div>
            </Link>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile HUD Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 md:hidden z-[100]">
        <Link href="/dashboard" className="text-primary flex flex-col items-center gap-0.5">
          <LayoutGrid className="h-5 w-5" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Cores</span>
        </Link>
        <Link href="/editor/new" className="bg-primary p-3 rounded-xl -translate-y-5 shadow-xl glow-primary text-black transition-transform active:scale-90">
          <Plus className="h-5 w-5" />
        </Link>
        <Link href="/settings" className="text-white/40 flex flex-col items-center gap-0.5">
          <Settings className="h-5 w-5" />
          <span className="text-[8px] font-bold uppercase tracking-widest">Protocol</span>
        </Link>
      </nav>
    </div>
  );
}
