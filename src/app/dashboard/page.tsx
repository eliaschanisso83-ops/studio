
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
  HardDrive
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { Logo } from '@/components/logo';

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProjects = () => {
      const saved = localStorage.getItem('forge_projects');
      if (saved) {
        setProjects(JSON.parse(saved));
      } else {
        const defaultProjects = [
          { id: '1', title: 'Cyber Drift', type: 'Racing 2D', date: '2h ago', status: 'Active', img: 'https://picsum.photos/seed/cyber/300/200' },
          { id: '2', title: 'Neon Slash', type: 'Action RPG', date: '1d ago', status: 'Draft', img: 'https://picsum.photos/seed/neon/300/200' },
          { id: '3', title: 'Star Void', type: 'Space Shooter', date: '3d ago', status: 'Active', img: 'https://picsum.photos/seed/star/300/200' },
          { id: '4', title: 'Grid Runner', type: 'Puzzle', date: '5d ago', status: 'Active', img: 'https://picsum.photos/seed/grid/300/200' },
        ];
        setProjects(defaultProjects);
        localStorage.setItem('forge_projects', JSON.stringify(defaultProjects));
      }
      setIsLoading(false);
    };
    loadProjects();
  }, []);

  const deleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('forge_projects', JSON.stringify(updated));
    toast({ 
      variant: "destructive", 
      title: "PROJETO_REMOVIDO", 
      description: "Dados locais expurgados com sucesso." 
    });
  };

  return (
    <div className="min-h-screen bg-[#020202] text-foreground flex flex-col font-body pb-24 md:pb-0 scanline">
      <header className="h-12 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-4 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Logo size={24} showText={false} />
          <div>
            <h1 className="font-headline font-bold text-[10px] tracking-tighter leading-none">
              FORGE<span className="text-primary">.AI</span>
            </h1>
            <div className="flex items-center gap-1 mt-0.5">
               <div className="flex items-center gap-1 bg-green-500/10 px-1 py-0 rounded border border-green-500/20">
                 <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[6px] font-bold text-green-500 uppercase tracking-widest">Local_Kernel_OK</span>
               </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-md text-white/40 hover:text-white hover:bg-white/5 h-7 w-7">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <div className="w-7 h-7 rounded-md bg-gradient-to-tr from-primary/20 to-accent/20 p-px">
            <div className="w-full h-full rounded-md bg-black flex items-center justify-center font-bold text-primary text-[7px] border border-white/5">
              US
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-3 md:p-6 max-w-5xl mx-auto w-full space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="h-3 w-3 text-white/20" />
            <h2 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 italic">Filesystem_Local</h2>
          </div>
          <Link href="/editor/new">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-headline font-bold h-7 px-3 rounded-md shadow-lg text-[8px] uppercase tracking-widest neo-button">
              <Plus className="mr-1 h-3 w-3" /> Synthesis
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white/5 border border-white/5 p-0.5 rounded-md h-7 mb-3">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded px-3 font-bold text-[7px] uppercase tracking-widest h-full">Library</TabsTrigger>
            <TabsTrigger value="cloud" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded px-3 font-bold text-[7px] uppercase tracking-widest h-full">Cloud_Vault</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {isLoading ? (
              Array.from({length: 4}).map((_, i) => (
                <div key={i} className="aspect-[16/10] rounded-lg bg-white/5 animate-pulse border border-white/5" />
              ))
            ) : (
              projects.map((p) => (
                <Card key={p.id} className="glass-panel group overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-300 rounded-lg flex flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint="game thumbnail"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-1 right-1">
                      <span className="text-[5px] px-1 py-0.5 rounded bg-black/80 border border-white/10 text-primary font-black uppercase tracking-widest">
                        {p.status}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="p-1.5 pb-0.5 space-y-0">
                    <CardTitle className="font-headline font-bold text-[9px] text-white truncate uppercase tracking-tighter italic">{p.title}</CardTitle>
                    <span className="text-[6px] font-black text-white/20 uppercase tracking-tighter truncate">{p.type}</span>
                  </CardHeader>
                  <CardFooter className="p-1.5 pt-0.5 flex justify-between items-center mt-auto border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center text-white/20 text-[5px] font-bold uppercase tracking-widest">
                      <Clock className="h-1.5 w-1.5 mr-1" />
                      {p.date}
                    </div>
                    <div className="flex gap-1">
                      <Button 
                         onClick={() => deleteProject(p.id)}
                         variant="ghost" 
                         size="icon" 
                         className="h-4 w-4 rounded-sm hover:bg-destructive/10 hover:text-destructive text-white/10"
                       >
                         <Trash2 className="h-2.5 w-2.5" />
                       </Button>
                       <Link href={`/editor/${p.id}`}>
                         <Button size="icon" className="h-4 w-4 rounded-sm bg-primary/5 text-primary hover:bg-primary hover:text-black transition-colors">
                           <Code className="h-2.5 w-2.5" />
                         </Button>
                       </Link>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
            
            <Link href="/editor/new">
              <div className="border border-dashed border-white/10 rounded-lg aspect-[16/10] flex flex-col items-center justify-center p-2 text-center space-y-1 hover:bg-white/5 hover:border-primary/20 transition-all group cursor-pointer">
                <Plus className="h-3 w-3 text-white/10 group-hover:text-primary transition-all" />
                <h3 className="font-headline font-bold text-[7px] text-white/20 uppercase tracking-[0.2em]">New_Genesis</h3>
              </div>
            </Link>
          </TabsContent>
        </Tabs>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 h-12 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 md:hidden z-[100]">
        <Link href="/dashboard" className="text-primary flex flex-col items-center gap-0.5">
          <LayoutGrid className="h-3.5 w-3.5" />
          <span className="text-[6px] font-bold uppercase tracking-[0.3em]">Home</span>
        </Link>
        <Link href="/editor/new" className="bg-primary p-2 rounded-md -translate-y-3 shadow-xl glow-primary text-black transition-transform active:scale-90 border border-white/20">
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
