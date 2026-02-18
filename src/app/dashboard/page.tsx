
"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Plus, 
  Search, 
  Settings, 
  Clock, 
  Trash2, 
  Edit2, 
  Play, 
  ExternalLink,
  LayoutGrid,
  Zap,
  Box
} from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  const projects = [
    { id: '1', title: 'Cyber Drift', type: 'Racing 2D', date: '2h ago', status: 'Active', img: 'https://picsum.photos/seed/cyber/600/400' },
    { id: '2', title: 'Neon Slash', type: 'Action RPG', date: '1d ago', status: 'Draft', img: 'https://picsum.photos/seed/neon/600/400' },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-foreground flex flex-col font-body pb-20 md:pb-0">
      <header className="h-20 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-6 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-2 rounded-xl border border-primary/20">
            <Gamepad2 className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="font-headline font-bold text-xl tracking-tighter leading-none">
              FORGE<span className="text-primary">.AI</span>
            </h1>
            <span className="text-[10px] text-white/30 font-black tracking-widest uppercase">Mobile_Studio v2.0</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="rounded-xl text-white/40 hover:text-white hover:bg-white/5 h-11 w-11">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary/40 to-accent/40 p-px">
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center font-bold text-primary text-xs border border-white/5">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter">My Projects</h2>
            <p className="text-white/40 font-medium text-sm md:text-base">Synthesize new worlds or refine your existing logic.</p>
          </div>
          <Link href="/editor/new" className="w-full md:w-auto">
            <Button className="w-full bg-primary hover:bg-primary/90 text-black font-headline font-bold h-16 px-8 rounded-2xl glow-primary shadow-xl">
              <Plus className="mr-2 h-6 w-6" /> Genesis Project
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-8 overflow-x-auto custom-scrollbar">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl h-14">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-8 font-bold text-xs uppercase tracking-widest">Recent</TabsTrigger>
              <TabsTrigger value="cloud" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-xl px-8 font-bold text-xs uppercase tracking-widest">Cloud</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-0">
            {projects.map((p) => (
              <Card key={p.id} className="glass-panel group overflow-hidden border-white/5 hover:border-primary/40 transition-all duration-500 rounded-3xl flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    data-ai-hint="game screenshot"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link href={`/editor/${p.id}`}>
                      <Button className="rounded-2xl font-bold bg-white text-black h-14 px-8 shadow-2xl">
                        OPEN STUDIO
                      </Button>
                    </Link>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest bg-black/60 backdrop-blur-md border border-white/20 text-primary">
                      {p.status}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="space-y-1">
                    <CardTitle className="font-headline font-bold text-2xl text-white">{p.title}</CardTitle>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">{p.type}</p>
                  </div>
                </CardHeader>
                <CardFooter className="p-6 pt-0 flex justify-between items-center mt-auto">
                  <div className="flex items-center text-white/40 text-[10px] font-bold uppercase tracking-widest">
                    <Clock className="h-3 w-3 mr-2" />
                    {p.date}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-white/20 hover:text-destructive hover:bg-destructive/10 rounded-xl">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Link href="/editor/new">
              <div className="border-2 border-dashed border-white/10 rounded-3xl h-full min-h-[300px] flex flex-col items-center justify-center p-8 text-center space-y-4 hover:bg-white/5 hover:border-primary/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-all">
                  <Plus className="h-8 w-8 text-white/20 group-hover:text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold text-lg text-white">Create New</h3>
                  <p className="text-xs text-white/30 font-medium">Start a new AI-powered project.</p>
                </div>
              </div>
            </Link>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-6 md:hidden z-[100]">
        <Link href="/dashboard" className="text-primary flex flex-col items-center gap-1">
          <LayoutGrid className="h-6 w-6" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Projects</span>
        </Link>
        <Link href="/editor/new" className="bg-primary p-4 rounded-2xl -translate-y-8 shadow-2xl glow-primary text-black">
          <Plus className="h-7 w-7" />
        </Link>
        <Link href="/settings" className="text-white/40 flex flex-col items-center gap-1">
          <Settings className="h-6 w-6" />
          <span className="text-[9px] font-bold uppercase tracking-widest">Settings</span>
        </Link>
      </nav>
    </div>
  );
}
