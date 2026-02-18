
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";
import { 
  Gamepad2, 
  ArrowLeft, 
  Play, 
  Save, 
  Layers, 
  Code2, 
  ChevronRight,
  MousePointer2,
  Box,
  Activity,
  Cpu,
  RefreshCcw,
  Check,
  Github,
  Loader2,
  Bot,
  BrainCircuit,
  Zap,
  Lock,
  Terminal,
  Smartphone
} from 'lucide-react';
import Link from 'next/link';

export default function GameEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeAI, setActiveAI] = useState('gemini');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [scriptContent, setScriptContent] = useState(`extends CharacterBody2D\n\nconst SPEED = 300.0\nconst JUMP_FORCE = -400.0\n\nfunc _physics_process(delta):\n    # Core logic here\n    pass`);
  const { toast } = useToast();
  
  useEffect(() => {
    const model = localStorage.getItem('selected_ai_model') || 'gemini';
    setActiveAI(model);
    const savedKeys = localStorage.getItem('ai_api_keys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setHasApiKey(!!keys[model]);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "Module Compiled", description: "Local cache updated successfully." });
    }, 800);
  };

  const aiIcons: any = { gemini: Zap, gpt4: BrainCircuit, claude: Bot, copilot: Cpu };
  const SelectedIcon = aiIcons[activeAI] || Zap;

  return (
    <div className="h-screen bg-[#020202] text-foreground flex flex-col overflow-hidden font-body scanline">
      {/* HUD Header */}
      <header className="h-16 border-b border-white/5 bg-black/80 backdrop-blur-2xl flex items-center px-4 justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-10 w-10 text-white/40 hover:text-white rounded-xl">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="h-6 w-px bg-white/10 hidden sm:block" />
          <div className="flex flex-col">
            <h1 className="font-headline font-bold text-[11px] text-white tracking-widest uppercase italic flex items-center gap-2">
              STUDIO_V2 <span className="bg-primary/20 text-primary text-[8px] px-2 py-0.5 rounded-md border border-primary/20">LIVE</span>
            </h1>
            <span className="text-[9px] text-white/30 font-mono uppercase tracking-tighter">res://src/player.gd</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white/40 hover:text-white sm:hidden">
             <Smartphone className="h-5 w-5" />
          </Button>
          <Button onClick={handleSave} className="h-10 bg-white/5 border border-white/10 hover:border-primary/50 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2 text-primary" />}
            <span className="hidden sm:inline">Compile</span>
          </Button>
          <Button className="h-10 bg-accent hover:bg-accent/90 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-accent/20">
            <Play className="h-4 w-4 mr-2 fill-current" /> Play
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Desktop only */}
        <aside className="w-64 border-r border-white/5 bg-black/40 hidden lg:flex flex-col z-40 backdrop-blur-md">
          <div className="p-4 space-y-6">
            <div className="space-y-2">
              <h3 className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">Hierarchy</h3>
              <div className="space-y-1">
                {['World', 'Player', 'Camera2D', 'CanvasLayer'].map((node, i) => (
                  <div key={node} className={`flex items-center gap-3 p-3 rounded-xl text-[11px] font-bold uppercase transition-all cursor-pointer ${i === 1 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/40 hover:bg-white/5'}`}>
                    <Box className="h-3.5 w-3.5" />
                    {node}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Viewport */}
        <main className="flex-1 bg-black relative flex flex-col p-4 overflow-hidden">
          <div className="flex-1 glass-panel rounded-3xl relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="flex flex-col items-center gap-8 z-10">
               <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 blur-[60px] animate-pulse" />
                  <div className="w-24 h-24 rounded-3xl bg-black border-2 border-primary/40 flex items-center justify-center relative shadow-2xl">
                    <Gamepad2 className="h-12 w-12 text-primary drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                  </div>
               </div>
               <div className="text-center space-y-2">
                 <p className="font-headline font-bold text-xl text-white uppercase italic tracking-tighter">Ready to Simulation</p>
                 <div className="flex items-center gap-3 justify-center">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em]">Engine_Core: Operational</span>
                 </div>
               </div>
            </div>

            <div className="absolute top-6 left-6 flex items-center gap-4 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
               <Activity className="h-4 w-4 text-green-500" />
               <div className="text-[10px] font-mono text-white/60 tracking-widest uppercase">
                 FPS: <span className="text-green-500 font-bold">120.0</span>
               </div>
            </div>
          </div>

          {/* AI HUD Input */}
          <div className={`mt-4 glass-panel rounded-2xl p-2.5 flex items-center gap-4 transition-all ${!hasApiKey ? 'opacity-50 grayscale' : 'ring-1 ring-primary/20'}`}>
            <div className="h-12 w-12 rounded-xl bg-black border border-white/10 flex items-center justify-center shrink-0">
               <SelectedIcon className={`h-6 w-6 ${hasApiKey ? 'text-primary' : 'text-red-500'}`} />
            </div>
            <Input 
              disabled={!hasApiKey}
              placeholder={hasApiKey ? `Mudar mecânicas com ${activeAI.toUpperCase()}...` : `PAID API KEY REQUIRED`} 
              className="flex-1 border-none bg-transparent h-12 text-sm text-white placeholder:text-white/10 focus-visible:ring-0"
            />
            <Button 
              disabled={!hasApiKey}
              className={`h-12 px-8 rounded-xl font-headline font-bold uppercase tracking-widest text-xs ${hasApiKey ? 'bg-primary text-black glow-primary' : 'bg-white/5 text-white/20'}`}
            >
              {hasApiKey ? 'FORGE' : <Lock className="h-4 w-4" />}
            </Button>
          </div>
        </main>

        {/* Inspector/Script - Desktop/Tab only */}
        <aside className="w-[450px] border-l border-white/5 bg-black/40 hidden xl:flex flex-col z-40 backdrop-blur-md">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <TabsList className="bg-transparent border-b border-white/5 h-16 w-full justify-around rounded-none">
              <TabsTrigger value="inspector" className="data-[state=active]:text-primary font-bold uppercase text-[10px] tracking-widest">Inspector</TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:text-primary font-bold uppercase text-[10px] tracking-widest">Script_Editor</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="inspector" className="p-6 m-0 space-y-8">
                 <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                       <h4 className="font-bold text-xs text-white uppercase tracking-tighter">Node: Player</h4>
                       <p className="text-[9px] text-white/30 font-mono">CLASS: CHARACTER_BODY_2D</p>
                    </div>
                    {['Speed', 'Gravity', 'Jump Force'].map((prop) => (
                      <div key={prop} className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                          {prop}
                          <span className="text-primary font-mono">300.0</span>
                        </div>
                        <Slider defaultValue={[30]} max={100} step={1} className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4" />
                      </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="code" className="p-0 m-0 h-full flex flex-col">
                <div className="flex-1 relative">
                  <div className="absolute top-0 left-0 w-10 h-full bg-black/40 border-r border-white/5 flex flex-col items-center py-4 gap-2 opacity-30">
                     {Array.from({length: 30}).map((_, i) => <span key={i} className="text-[9px] font-mono leading-6">{i+1}</span>)}
                  </div>
                  <Textarea 
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                    className="w-full h-full bg-transparent border-none text-primary/80 font-mono text-[12px] p-4 pl-14 focus-visible:ring-0 resize-none min-h-[calc(100vh-200px)] custom-scrollbar"
                    spellCheck={false}
                  />
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </aside>
      </div>

      <style jsx global>{`
        .scanline::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
          z-index: 1000;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
          opacity: 0.15;
        }
      `}</style>
    </div>
  );
}
