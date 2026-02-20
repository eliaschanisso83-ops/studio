
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
  Settings,
  Activity,
  Cpu,
  Loader2,
  Zap,
  BrainCircuit,
  Bot,
  Github
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { modifyGameElementWithAI } from '@/ai/flows/modify-game-element-with-ai';

export default function GameEditor() {
  const { id } = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isForging, setIsForging] = useState(false);
  const [activeAI, setActiveAI] = useState('gemini');
  const [userKey, setUserKey] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);
  const [scriptContent, setScriptContent] = useState('');
  const [instruction, setInstruction] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadProject = async () => {
      // Try local first
      const local = localStorage.getItem('forge_projects');
      if (local) {
        const projects = JSON.parse(local);
        const p = projects.find((p: any) => p.id === id);
        if (p) {
          setProject(p);
          setScriptContent(p.script || '# Project Script\n\nextends CharacterBody2D\n\nfunc _ready():\n    print("System Online")');
          setIsLoading(false);
          return;
        }
      }

      // Try Cloud
      const { data, error } = await supabase.from('projects').select('*').eq('id', id).single();
      if (!error && data) {
        setProject(data);
        setScriptContent(data.script_content || '');
      }
      setIsLoading(false);
    };

    loadProject();

    const model = localStorage.getItem('selected_ai_model') || 'gemini';
    setActiveAI(model);
    const savedKeys = localStorage.getItem('ai_api_keys');
    if (savedKeys) {
      const keys = JSON.parse(savedKeys);
      setUserKey(keys[model] || null);
    }
  }, [id]);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Save Local
    const local = localStorage.getItem('forge_projects');
    if (local) {
      const projects = JSON.parse(local);
      const index = projects.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        projects[index].script = scriptContent;
        localStorage.setItem('forge_projects', JSON.stringify(projects));
      }
    }

    // Save Cloud if logged in
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from('projects').update({ script_content: scriptContent }).eq('id', id);
    }

    setTimeout(() => {
      setIsSaving(false);
      toast({ title: "KERNEL_UPDATED", description: "Script compilado e persistido." });
    }, 400);
  };

  const handleForge = async () => {
    if (!instruction) return;
    setIsForging(true);
    
    try {
      const result = await modifyGameElementWithAI({
        gameElementScript: scriptContent,
        modificationInstruction: instruction,
        gameEngineType: "Godot",
        scriptLanguage: "GDScript",
        userApiKey: userKey || undefined
      });

      if (result.modifiedGameElementScript) {
        setScriptContent(result.modifiedGameElementScript);
        setInstruction('');
        toast({ title: "SYNTHESIS_COMPLETE", description: result.explanation });
      }
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "FORGE_ERROR", 
        description: "Erro na síntese neural. Tente novamente." 
      });
    } finally {
      setIsForging(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const aiIcons: any = { gemini: Zap, gpt4: BrainCircuit, claude: Bot, copilot: Cpu };
  const SelectedIcon = aiIcons[activeAI] || Zap;

  return (
    <div className="h-screen bg-[#020202] text-foreground flex flex-col overflow-hidden font-body scanline">
      <header className="h-14 border-b border-white/5 bg-black/90 backdrop-blur-2xl flex items-center px-4 justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white/40 hover:text-white rounded-lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-col">
            <h1 className="font-headline font-bold text-[10px] text-white tracking-widest uppercase italic flex items-center gap-2">
              {project?.title || 'UNNAMED_ENGINE'} <span className="bg-primary/20 text-primary text-[7px] px-1.5 py-0.5 rounded border border-primary/20 uppercase tracking-normal">Active_Node</span>
            </h1>
            <span className="text-[8px] text-white/20 font-mono uppercase tracking-tighter">res://scripts/core.gd</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white">
            <Link href="/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <Button onClick={handleSave} className="h-8 bg-white/5 border border-white/10 hover:border-primary/50 text-white font-bold text-[9px] uppercase tracking-widest rounded-lg">
            {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5 text-primary" />}
            Save
          </Button>
          <Button className="h-8 bg-accent hover:bg-accent/90 text-white font-bold text-[9px] uppercase tracking-widest rounded-lg shadow-lg shadow-accent/20">
            <Play className="h-3.5 w-3.5 mr-1.5 fill-current" /> Run
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 bg-black relative flex flex-col p-3 overflow-hidden">
          <div className="flex-1 glass-panel rounded-2xl relative overflow-hidden flex items-center justify-center border-white/5">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="flex flex-col items-center gap-6 z-10">
               <div className="w-20 h-20 rounded-2xl bg-black border border-primary/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                  <Gamepad2 className="h-10 w-10 text-primary opacity-50" />
               </div>
               <div className="text-center space-y-1">
                 <p className="font-headline font-bold text-sm text-white/60 uppercase italic tracking-widest">Viewport_Active</p>
                 <div className="flex items-center gap-2 justify-center">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Live_Engine_Loop</span>
                 </div>
               </div>
            </div>

            <div className="absolute top-4 left-4 flex items-center gap-3 bg-black/80 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/5">
               <Activity className="h-3 w-3 text-green-500" />
               <div className="text-[9px] font-mono text-white/40 tracking-widest uppercase">
                 FPS: <span className="text-green-500 font-bold">120.0</span> | MODE: <span className="text-primary font-bold">{userKey ? 'BYOK_PRO' : 'FREE_TIER'}</span>
               </div>
            </div>
          </div>

          <div className="mt-3 glass-panel rounded-xl p-2 flex items-center gap-3 border-primary/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <div className="h-10 w-10 rounded-lg bg-black border border-white/5 flex items-center justify-center shrink-0">
               <SelectedIcon className={`h-5 w-5 ${userKey ? 'text-primary text-neon' : 'text-white/40'}`} />
            </div>
            <Input 
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder={`Instruir ${activeAI.toUpperCase()} para modificar o código...`} 
              className="flex-1 border-none bg-transparent h-10 text-xs text-white placeholder:text-white/10 focus-visible:ring-0"
              onKeyDown={(e) => e.key === 'Enter' && handleForge()}
            />
            <Button 
              onClick={handleForge}
              disabled={isForging || !instruction}
              className="h-10 px-6 rounded-lg font-headline font-bold uppercase tracking-widest text-[9px] bg-primary text-black hover:bg-primary/80"
            >
              {isForging ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Forge'}
            </Button>
          </div>
        </main>

        <aside className="w-[420px] border-l border-white/5 bg-black/60 hidden xl:flex flex-col z-40 backdrop-blur-md">
          <Tabs defaultValue="code" className="flex-1 flex flex-col">
            <TabsList className="bg-transparent border-b border-white/5 h-12 w-full justify-around rounded-none">
              <TabsTrigger value="inspector" className="data-[state=active]:text-primary font-bold uppercase text-[9px] tracking-widest">Inspector_Node</TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:text-primary font-bold uppercase text-[9px] tracking-widest">Neural_IDE</TabsTrigger>
            </TabsList>
            
            <ScrollArea className="flex-1">
              <TabsContent value="inspector" className="p-4 m-0 space-y-6">
                 <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                       <h4 className="font-bold text-[10px] text-white uppercase tracking-tighter">Identity: {project?.title}</h4>
                       <p className="text-[8px] text-white/20 font-mono">NODE_UID: {id}</p>
                    </div>
                    {['Physics_Speed', 'Gravity_Scale', 'Jump_Impulse'].map((prop, i) => (
                      <div key={prop} className="space-y-3">
                        <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/30">
                          {prop}
                          <span className="text-primary font-mono">{[300, 9.8, 400][i]}.0</span>
                        </div>
                        <Slider defaultValue={[30]} max={100} step={1} className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3" />
                      </div>
                    ))}
                 </div>
              </TabsContent>

              <TabsContent value="code" className="p-0 m-0 h-full flex flex-col">
                <div className="flex-1 relative bg-[#050505]">
                  <div className="absolute top-0 left-0 w-8 h-full bg-black/40 border-r border-white/5 flex flex-col items-center py-4 gap-1 opacity-20 select-none">
                     {Array.from({length: 40}).map((_, i) => <span key={i} className="text-[8px] font-mono leading-5">{i+1}</span>)}
                  </div>
                  <Textarea 
                    value={scriptContent}
                    onChange={(e) => setScriptContent(e.target.value)}
                    className="w-full h-full bg-transparent border-none text-primary/70 font-mono text-[11px] p-4 pl-12 focus-visible:ring-0 resize-none min-h-[calc(100vh-160px)] custom-scrollbar leading-5"
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
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%), 
                      linear-gradient(90deg, rgba(255, 0, 0, 0.01), rgba(0, 255, 0, 0.005), rgba(0, 0, 255, 0.01));
          z-index: 1000;
          background-size: 100% 2px, 3px 100%;
          pointer-events: none;
          opacity: 0.1;
        }
      `}</style>
    </div>
  );
}
