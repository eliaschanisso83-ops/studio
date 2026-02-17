"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Gamepad2, 
  ArrowLeft, 
  Play, 
  Save, 
  Rocket, 
  Plus, 
  Layers, 
  Settings, 
  Code2, 
  Wand2, 
  ChevronRight,
  MousePointer2,
  Move,
  Type,
  Image as ImageIcon,
  Zap,
  Box,
  Activity,
  Maximize2
} from 'lucide-react';
import Link from 'next/link';

export default function GameEditor() {
  const [activeTab, setActiveTab] = useState('scene');
  const [selectedElement, setSelectedElement] = useState<string | null>('Player');
  
  // Simulated properties
  const [properties, setProperties] = useState({
    speed: 300,
    health: 100,
    gravity: 980,
    jumpForce: -400,
    color: '#0EA5E9'
  });

  return (
    <div className="h-screen bg-black text-foreground flex flex-col overflow-hidden">
      {/* Top Header - Glass themed */}
      <header className="h-14 border-b border-white/5 bg-black/60 backdrop-blur-xl flex items-center px-4 justify-between shrink-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white/40 hover:text-white hover:bg-white/5 rounded-lg">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <div className="flex flex-col">
            <h1 className="font-headline font-bold text-xs text-white tracking-widest uppercase flex items-center gap-2">
              Neon Robot Heist <span className="bg-primary/20 text-primary text-[8px] px-1.5 py-0.5 rounded border border-primary/20">DEV_MODE</span>
            </h1>
            <span className="text-[10px] text-white/30 font-mono">res://scenes/Main.tscn</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 mr-4">
             <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-white/60 tracking-tighter">CLOUD SYNC: OK</span>
             </div>
          </div>
          <Button variant="outline" size="sm" className="h-9 bg-white/5 border-white/10 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-white/10">
            <Save className="h-3.5 w-3.5 mr-2 text-primary" /> Save
          </Button>
          <Button size="sm" className="h-9 bg-accent hover:bg-accent/90 text-white font-bold text-[10px] uppercase tracking-widest neo-button">
            <Play className="h-3.5 w-3.5 mr-2 fill-current" /> Preview
          </Button>
          <Button size="sm" className="h-9 bg-primary hover:bg-primary/90 text-black font-bold text-[10px] uppercase tracking-widest neo-button">
            <Rocket className="h-3.5 w-3.5 mr-2" /> Deploy
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Scene Hierarchy */}
        <aside className="w-72 border-r border-white/5 bg-black/40 flex flex-col z-40">
          <div className="p-5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Toolbar</h3>
              <Settings className="h-3 w-3 text-white/20" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[MousePointer2, Move, Maximize2, Box].map((Icon, i) => (
                <Button key={i} variant={i === 0 ? 'secondary' : 'ghost'} size="icon" className={`h-12 w-full rounded-xl border ${i === 0 ? 'border-primary/40 bg-primary/10 text-primary' : 'border-white/5 text-white/40 hover:text-white'}`}>
                  <Icon className="h-5 w-5"/>
                </Button>
              ))}
            </div>
          </div>
          <Separator className="bg-white/5" />
          <ScrollArea className="flex-1">
            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Scene Tree</h3>
                <Plus className="h-3 w-3 text-white/40 hover:text-primary cursor-pointer" />
              </div>
              <div className="space-y-1">
                {['Main', 'World', 'Player', 'Enemies', 'Collectibles', 'Background', 'UI_Canvas'].map((item) => (
                  <Button 
                    key={item} 
                    variant="ghost"
                    className={`w-full justify-start text-xs h-10 group transition-all rounded-lg ${selectedElement === item ? 'bg-primary/10 text-primary border border-primary/20' : 'text-white/40 hover:text-white/80'}`}
                    onClick={() => setSelectedElement(item)}
                  >
                    <ChevronRight className={`h-3 w-3 mr-2 transition-transform ${item === 'World' || item === 'Main' ? 'rotate-90 text-primary' : 'opacity-20'}`} />
                    <Layers className={`h-3.5 w-3.5 mr-3 transition-colors ${selectedElement === item ? 'text-primary' : 'text-white/20'}`} />
                    <span className="font-bold tracking-tight">{item}</span>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Center - Viewport - Simulated high-end render */}
        <main className="flex-1 bg-[#050505] relative p-6 overflow-hidden flex flex-col">
          <div className="bg-black border border-white/5 rounded-2xl flex-1 relative overflow-hidden shadow-inner flex items-center justify-center">
             {/* Grid background for editor feel */}
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
             
             {/* Simulated Game Preview */}
             <div className="text-white flex flex-col items-center gap-6 z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary blur-[40px] opacity-20 animate-pulse" />
                  <Gamepad2 className="h-20 w-20 text-primary relative" />
                </div>
                <div className="space-y-2 text-center">
                  <p className="font-headline font-bold text-xl tracking-tighter">ENGINE_VIEWPORT_IDLE</p>
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Ready for simulation input</p>
                </div>
             </div>
             
             {/* Canvas Mock elements */}
             <div className="absolute bottom-16 left-16 w-16 h-16 bg-primary rounded-xl shadow-[0_0_30px_rgba(14,165,233,0.4)] border border-primary/50 group cursor-move">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-primary text-[10px] font-mono px-2 py-1 rounded border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  Player_Node
                </div>
             </div>
             <div className="absolute bottom-16 right-32 w-48 h-2 bg-accent/20 border border-accent/40 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.1)]" />
             
             {/* HUD Overlays */}
             <div className="absolute top-8 left-8 flex items-center gap-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <Activity className="h-4 w-4 text-green-500" />
                <div className="text-[10px] font-mono text-white/60 tracking-widest">
                  FPS: <span className="text-green-500 font-bold">144.2</span>
                </div>
             </div>
             
             <div className="absolute top-8 right-8 text-white font-headline text-2xl tracking-tighter opacity-40">
                SCORE: 004,250
             </div>
          </div>

          {/* Bottom - AI Neural Command Bar */}
          <div className="mt-6 glass-card rounded-2xl p-4 flex items-center gap-4 border-primary/20 relative">
            <div className="absolute inset-0 bg-primary/5 rounded-2xl pointer-events-none" />
            <div className="bg-primary/20 p-3 rounded-xl text-primary border border-primary/20 shadow-[0_0_15px_rgba(14,165,233,0.2)]">
              <Zap className="h-6 w-6 fill-current" />
            </div>
            <Input 
              placeholder="Command AI: 'Increase jump force and add particle trail to player'" 
              className="flex-1 border-none bg-white/5 h-12 text-sm text-white focus-visible:ring-1 focus-visible:ring-primary/50 rounded-xl"
            />
            <Button className="bg-primary hover:bg-primary/90 text-black font-headline font-bold h-12 px-8 neo-button rounded-xl">
              EXECUTE_CHANGE
            </Button>
          </div>
        </main>

        {/* Right Sidebar - Inspector */}
        <aside className="w-80 border-l border-white/5 bg-black/40 hidden lg:flex flex-col z-40">
          <Tabs defaultValue="inspector" className="flex-1 flex flex-col">
            <div className="px-4 border-b border-white/5 bg-black/20">
              <TabsList className="w-full bg-transparent p-0 gap-6 h-14">
                <TabsTrigger value="inspector" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-black text-[10px] uppercase tracking-widest text-white/40 data-[state=active]:text-primary transition-all">Inspector</TabsTrigger>
                <TabsTrigger value="assets" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-black text-[10px] uppercase tracking-widest text-white/40 data-[state=active]:text-primary transition-all">FileSystem</TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-black text-[10px] uppercase tracking-widest text-white/40 data-[state=active]:text-primary transition-all">Neural_Script</TabsTrigger>
              </TabsList>
            </div>
            
            <ScrollArea className="flex-1">
              <TabsContent value="inspector" className="p-6 m-0 space-y-8">
                {selectedElement ? (
                  <>
                    <div className="space-y-1 bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-headline font-bold text-sm text-white uppercase tracking-tighter">Node: {selectedElement}</h4>
                        <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-black">2D_PHYSICS</span>
                      </div>
                      <p className="text-[10px] text-white/30 font-mono">Inherits: CharacterBody2D</p>
                    </div>

                    <div className="space-y-6">
                      {[
                        { label: 'Movement Speed', key: 'speed', max: 1000, suffix: 'px/s' },
                        { label: 'Health Pool', key: 'health', max: 200, suffix: 'HP' },
                        { label: 'Jump Impulse', key: 'jumpForce', min: -1000, max: 0, suffix: '' }
                      ].map((prop) => (
                        <div key={prop.key} className="space-y-3">
                          <div className="flex justify-between items-center">
                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">{prop.label}</label>
                            <span className="text-[10px] text-primary font-mono font-bold">{(properties as any)[prop.key]}{prop.suffix}</span>
                          </div>
                          <Slider 
                            defaultValue={[(properties as any)[prop.key]]} 
                            max={prop.max} 
                            min={prop.min || 0}
                            step={1} 
                            onValueChange={(val) => setProperties(p => ({...p, [prop.key]: val[0]}))}
                            className="[&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-primary"
                          />
                        </div>
                      ))}

                      <div className="space-y-4 pt-2">
                         <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Shader Color Tint</label>
                         <div className="grid grid-cols-5 gap-3">
                            {['#0EA5E9', '#F97316', '#22C55E', '#EF4444', '#8B5CF6'].map(c => (
                              <button 
                                key={c}
                                className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${properties.color === c ? 'border-primary shadow-[0_0_15px_rgba(14,165,233,0.5)] scale-110' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setProperties(p => ({...p, color: c}))}
                              />
                            ))}
                         </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 opacity-20">
                    <MousePointer2 className="h-12 w-12" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em]">Select node to inspect</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="assets" className="p-4 m-0">
                <div className="grid grid-cols-2 gap-3">
                   {['Player.tscn', 'Coin.png', 'Grass_Tile.png', 'Dirt_Tile.png', 'Blob_Enemy.tscn', 'SFX_Jump.wav', 'BGM_Lvl1.ogg'].map(a => (
                     <div key={a} className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-primary/40 transition-all cursor-pointer group">
                        <div className="aspect-square bg-black/40 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/5 transition-colors">
                           {a.endsWith('.wav') || a.endsWith('.ogg') ? <Zap className="h-6 w-6 text-white/20 group-hover:text-primary transition-colors" /> : <ImageIcon className="h-6 w-6 text-white/20 group-hover:text-primary transition-colors" />}
                        </div>
                        <p className="text-[10px] font-bold truncate text-white/40 group-hover:text-white transition-colors">{a}</p>
                     </div>
                   ))}
                </div>
              </TabsContent>

              <TabsContent value="code" className="p-0 m-0 h-full">
                <div className="bg-[#0a0a0a] text-primary/80 p-6 font-mono text-[11px] leading-relaxed h-full min-h-[600px] border-t border-white/5">
                  <div className="flex items-center gap-2 mb-6 opacity-30">
                    <Code2 className="h-3 w-3" />
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">Neural_Generated_Source</span>
                  </div>
                  <pre className="whitespace-pre-wrap selection:bg-primary/20">
                    {`extends CharacterBody2D

# Neural Constants
const SPEED = ${properties.speed}.0
const JUMP_FORCE = ${properties.jumpForce}.0

var gravity = 980.0

func _physics_process(delta):
    # Apply Environmental Gravity
    if not is_on_floor():
        velocity.y += gravity * delta

    # Input Matrix Check
    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_FORCE

    # Vector calculation
    var axis = Input.get_axis("left", "right")
    if axis:
        velocity.x = axis * SPEED
    else:
        velocity.x = lerp(velocity.x, 0.0, 0.2)

    # Core Execution
    move_and_slide()`}
                  </pre>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </aside>
      </div>

      {/* Mobile Control Bar - High contrast HUD */}
      <div className="md:hidden flex border-t border-white/10 bg-black/80 backdrop-blur-2xl h-18 items-center justify-around px-4 pb-safe">
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none text-white/40 hover:text-primary">
            <Layers className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Nodes</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none text-white/40 hover:text-primary">
            <Settings className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Props</span>
          </Button>
          <div className="relative -top-4">
             <Button className="h-14 w-14 rounded-2xl bg-primary text-black neo-button shadow-[0_0_20px_rgba(14,165,233,0.5)]">
               <Zap className="h-6 w-6 fill-current" />
             </Button>
          </div>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none text-white/40 hover:text-primary">
            <Code2 className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Code</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none text-white/40 hover:text-primary">
            <Rocket className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase tracking-widest">Forge</span>
          </Button>
      </div>
    </div>
  );
}