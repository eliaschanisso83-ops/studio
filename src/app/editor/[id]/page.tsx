
"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
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
  Zap,
  Lock,
  Smartphone,
  BrainCircuit,
  Bot,
  Terminal
} from 'lucide-react';
import Link from 'next/link';

export default function GameEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeAI, setActiveAI] = useState('gemini');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [scriptContent, setScriptContent] = useState(`extends CharacterBody2D\n\nconst SPEED = 300.0\nconst JUMP_FORCE = -400.0\n\nfunc _physics_process(delta):\n    # Core logic locally persisted\n    var velocity = Vector2.ZERO\n    if Input.is_action_pressed("ui_right"):\n        velocity.x += 1\n    move_and_slide()`);
  const { toast } = useToast();
  
  useEffect(() => {
    const model = localStorage.getItem('selected_ai_model') || 'gemini';
    setActiveAI(model);
    const savedKeys = localStorage.getItem('ai_api_keys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setHasApiKey(!!keys[model]);
    }

    const savedScript = localStorage.getItem('current_editing_script');
    if (savedScript) setScriptContent(savedScript);
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('current_editing_script', scriptContent);
    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "NÚCLEO_ATUALIZADO", description: "Script compilado e salvo localmente." });
    }, 600);
  };

  const aiIcons: any = { gemini: Zap, gpt4: BrainCircuit, claude: Bot, copilot: Cpu };
  const SelectedIcon = aiIcons[activeAI] || Zap;

  return (
    <div className="h-screen bg-[#020202] text-foreground flex flex-col overflow-hidden font-body scanline">
      <header className="h-14 border-b border-white/5 bg-black/80 backdrop-blur-2xl flex items-center px-4 justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white/40 hover:text-white rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="font-headline font-bold text-[10px] text-white tracking-widest uppercase italic flex items-center gap-2">
              ENGINE_V2.5 <span className="bg-primary/20 text-primary text-[7px] px-1.5 py-0.5 rounded border border-primary/20">LOCAL_RUN</span>
            </h1>
            <span className="text-[8px] text-white/20 font-mono uppercase tracking-tighter">res://scripts/player.gd</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Button onClick={handleSave} className="h-8 bg-white/5 border border-white/10 hover:border-primary/50 text-white font-bold text-[9px] uppercase tracking-widest rounded-lg">
            {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5 text-primary" />}
            Save
          </Button>
          <Button className="h-8 bg-accent hover:bg-accent/90 text-white font-bold text-[9px] uppercase tracking-widest rounded-lg shadow-lg shadow-accent/20">
            <Play className="h-3.5 w-3.5 mr-1.5 fill-current" /> Play
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-56 border-r border-white/5 bg-black/40 hidden lg:flex flex-col z-40 backdrop-blur-md">
          <div className="p-3 space-y-4">
            <h3 className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Cores_Hierarchy</h3>
            <div className="space-y-1">
              {['Main_Scene', 'Player_Model', 'Environment', 'HUD_Canvas'].map((node, i) => (
                <div key={node} className={`flex items-center gap-2 p-2 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer ${i === 1 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/30 hover:bg-white/5'}`}>
                  <Box className="h-3 w-3" />
                  {node}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-black relative flex flex-col p-3 overflow-hidden">
          <div className="flex-1 glass-panel rounded-2xl relative overflow-hidden flex items-center justify-center border-white/5">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            
            <div className="flex flex-col items-center gap-6 z-10">
               <div className="w-20 h-20 rounded-2xl bg-black border border-primary/30 flex items-center justify-center relative shadow-2xl">
                  <Gamepad2 className="h-10 w-10 text-primary opacity-50" />
               </div>
               <div className="text-center space-y-1">
                 <p className="font-headline font-bold text-sm text-white/60 uppercase italic tracking-widest">Aguardando_Input</p>
                 <div className="flex items-center gap-2 justify-center">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">SISTEMA_OPERACIONAL</span>
                 </div>
               </div>
            </div>

            <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/5">
               <Activity className="h-3 w-3 text-green-500" />
               <div className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
                 FPS: <span className="text-green-500 font-bold">120.0</span>
               </div>
            </div>
          </div>

          <div className={`mt-3 glass-panel rounded-xl p-2 flex items-center gap-3 transition-all ${!hasApiKey ? 'opacity-40 grayscale' : 'border-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'}`}>
            <div className="h-10 w-10 rounded-lg bg-black border border-white/5 flex items-center justify-center shrink-0">
               <SelectedIcon className={`h-5 w-5 ${hasApiKey ? 'text-primary text-neon' : 'text-white/10'}`} />
            </div>
            <Input 
              disabled={!hasApiKey}
              placeholder={hasApiKey ? `Modificar via ${activeAI.toUpperCase()}...` : `MOTOR BLOQUEADO: API KEY NECESSÁRIA`} 
              className="flex-1 border-none bg-transparent h-10 text-xs text-white placeholder:text-white/10 focus-visible:ring-0"
            />
            <Button 
              disabled={!hasApiKey}
              className={`h-10 px-6 rounded-lg font-headline font-bold uppercase tracking-widest text-[9px] ${hasApiKey ? 'bg-primary text-black' : 'bg-white/5 text-white/10'}`}
            >
              {hasApiKey ? 'FORGE' : <Lock className="h-3 w-3" />}
            </Button>
          </div>
        </main>

        <aside className="w-[380px] border-l border-white/5 bg-black/40 hidden xl:flex flex-col z-40 backdrop-blur-md">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <TabsList className="bg-transparent border-b border-white/5 h-12 w-full justify-around rounded-none">
              <TabsTrigger value="inspector" className="data-[state=active]:text-primary font-bold uppercase text-[9px] tracking-widest">Inspector</TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:text-primary font-bold uppercase text-[9px] tracking-widest">Neural_Editor</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="inspector" className="p-4 m-0 space-y-6">
                 <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                       <h4 className="font-bold text-[10px] text-white uppercase tracking-tighter">Node: Player_Object</h4>
                       <p className="text-[8px] text-white/20 font-mono">TYPE: CharacterBody2D</p>
                    </div>
                    {['Velocidade', 'Gravidade', 'Impulso'].map((prop) => (
                      <div key={prop} className="space-y-3">
                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/30">
                          {prop}
                          <span className="text-primary font-mono">300.0</span>
                        </div>
                        <Slider defaultValue={[30]} max={100} step={1} className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3" />
                      </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="code" className="p-0 m-0 h-full flex flex-col">
                <div className="flex-1 relative">
                  <div className="absolute top-0 left-0 w-8 h-full bg-black/40 border-r border-white/5 flex flex-col items-center py-4 gap-1 opacity-20">
                     {Array.from({length: 30}).map((_, i) => <span key={i} className="text-[8px] font-mono leading-5">{i+1}</span>)}
                  </div>
                  <Textarea 
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                    className="w-full h-full bg-transparent border-none text-primary/80 font-mono text-[11px] p-4 pl-12 focus-visible:ring-0 resize-none min-h-[calc(100vh-200px)] custom-scrollbar leading-5"
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
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          z-index: 1000;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
          opacity: 0.1;
        }
      `}</style>
    </div>
  );
}
