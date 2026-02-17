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
  Zap
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
    color: '#29ABE2'
  });

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b bg-white flex items-center px-4 justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <h1 className="font-headline font-bold text-sm">Neon Runner <span className="text-muted-foreground font-normal ml-2">v0.1</span></h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8">
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button size="sm" className="h-8 bg-accent hover:bg-accent/90">
            <Play className="h-4 w-4 mr-2" /> Preview
          </Button>
          <Button size="sm" className="h-8 bg-primary hover:bg-primary/90">
            <Rocket className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Scene Hierarchy & Tools */}
        <aside className="w-64 border-r bg-white hidden md:flex flex-col">
          <div className="p-4 space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Tools</h3>
            <div className="grid grid-cols-4 gap-2">
              <Button variant="secondary" size="icon" className="h-10 w-10 border-2 border-primary bg-primary/5"><MousePointer2 className="h-4 w-4 text-primary"/></Button>
              <Button variant="ghost" size="icon" className="h-10 w-10"><Move className="h-4 w-4"/></Button>
              <Button variant="ghost" size="icon" className="h-10 w-10"><Plus className="h-4 w-4"/></Button>
              <Button variant="ghost" size="icon" className="h-10 w-10"><Wand2 className="h-4 w-4"/></Button>
            </div>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Scene Tree</h3>
              <div className="space-y-1">
                {['Main', 'World', 'Player', 'Enemies', 'Collectibles', 'Background', 'UI_Layer'].map((item) => (
                  <Button 
                    key={item} 
                    variant={selectedElement === item ? 'secondary' : 'ghost'} 
                    className={`w-full justify-start text-sm h-9 ${selectedElement === item ? 'text-primary font-bold' : ''}`}
                    onClick={() => setSelectedElement(item)}
                  >
                    <ChevronRight className={`h-3 w-3 mr-2 transition-transform ${item === 'World' || item === 'Main' ? 'rotate-90' : ''}`} />
                    <Layers className="h-3 w-3 mr-2 opacity-50" />
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Center - Viewport */}
        <main className="flex-1 bg-secondary/20 relative p-4 overflow-hidden flex flex-col">
          <div className="bg-black/90 rounded-xl flex-1 relative overflow-hidden shadow-inner flex items-center justify-center">
             {/* Simulated Game Preview */}
             <div className="text-white flex flex-col items-center gap-4 animate-pulse">
                <Gamepad2 className="h-16 w-16 text-primary" />
                <p className="font-headline font-bold text-lg">Game Viewport Ready</p>
                <p className="text-xs text-muted-foreground">Tap "Preview" to start interactive testing</p>
             </div>
             
             {/* Canvas Mock elements */}
             <div className="absolute bottom-10 left-10 w-12 h-12 bg-primary rounded shadow-lg shadow-primary/50" />
             <div className="absolute bottom-10 right-20 w-32 h-4 bg-accent/20 border border-accent/40 rounded" />
             <div className="absolute top-10 left-10 text-white font-headline">Score: 0025</div>
          </div>

          {/* Bottom - AI Modification Bar */}
          <div className="mt-4 bg-white border rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Zap className="h-5 w-5" />
            </div>
            <Input 
              placeholder="Ask AI to modify your game (e.g. 'Make player jump higher when moving fast')" 
              className="flex-1 border-none bg-secondary/30 focus-visible:ring-1"
            />
            <Button className="bg-primary hover:bg-primary/90">Apply Changes</Button>
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        <aside className="w-80 border-l bg-white hidden lg:flex flex-col">
          <Tabs defaultValue="inspector" className="flex-1 flex flex-col">
            <div className="px-4 border-b">
              <TabsList className="w-full bg-transparent p-0 gap-4 h-12">
                <TabsTrigger value="inspector" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-bold">Inspector</TabsTrigger>
                <TabsTrigger value="assets" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-bold">Assets</TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-0 font-bold">Code</TabsTrigger>
              </TabsList>
            </div>
            
            <ScrollArea className="flex-1">
              <TabsContent value="inspector" className="p-4 m-0 space-y-6">
                {selectedElement ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-headline font-bold text-sm">Node: {selectedElement}</h4>
                      <p className="text-xs text-muted-foreground">CharacterBody2D</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold">Movement Speed</label>
                          <span className="text-xs text-primary font-mono">{properties.speed}px/s</span>
                        </div>
                        <Slider 
                          defaultValue={[properties.speed]} 
                          max={1000} 
                          step={10} 
                          onValueChange={(val) => setProperties(p => ({...p, speed: val[0]}))}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold">Health Points</label>
                          <span className="text-xs text-primary font-mono">{properties.health} HP</span>
                        </div>
                        <Slider 
                          defaultValue={[properties.health]} 
                          max={200} 
                          step={1}
                          onValueChange={(val) => setProperties(p => ({...p, health: val[0]}))}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-bold">Jump Force</label>
                          <span className="text-xs text-primary font-mono">{properties.jumpForce}</span>
                        </div>
                        <Slider 
                          defaultValue={[properties.jumpForce]} 
                          min={-800}
                          max={0} 
                          step={10}
                          onValueChange={(val) => setProperties(p => ({...p, jumpForce: val[0]}))}
                        />
                      </div>

                      <div className="space-y-2 pt-2">
                         <label className="text-xs font-bold">Sprite Color</label>
                         <div className="flex gap-2">
                            {['#29ABE2', '#FF8F00', '#22C55E', '#EF4444', '#8B5CF6'].map(c => (
                              <button 
                                key={c}
                                className={`w-8 h-8 rounded-full border-2 ${properties.color === c ? 'border-primary ring-2 ring-primary/20' : 'border-transparent'}`}
                                style={{ backgroundColor: c }}
                                onClick={() => setProperties(p => ({...p, color: c}))}
                              />
                            ))}
                         </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                    <MousePointer2 className="h-10 w-10 mb-2" />
                    <p className="text-sm">Select an element to edit properties</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="assets" className="p-4 m-0">
                <div className="grid grid-cols-2 gap-3">
                   {['Player', 'Coin', 'Tile_Grass', 'Tile_Dirt', 'Enemy_Blob', 'Sound_Jump', 'Music_Level1'].map(a => (
                     <div key={a} className="p-2 border rounded-lg hover:border-primary transition-colors cursor-pointer group">
                        <div className="aspect-square bg-secondary/50 rounded flex items-center justify-center mb-2 group-hover:bg-primary/5">
                           {a.includes('Sound') || a.includes('Music') ? <Zap className="h-6 w-6 text-muted-foreground" /> : <ImageIcon className="h-6 w-6 text-muted-foreground" />}
                        </div>
                        <p className="text-[10px] font-bold truncate">{a}</p>
                     </div>
                   ))}
                </div>
              </TabsContent>

              <TabsContent value="code" className="p-0 m-0 h-full">
                <div className="bg-slate-900 text-slate-300 p-4 font-code text-xs h-full min-h-[500px]">
                  <pre className="whitespace-pre-wrap">
                    {`extends CharacterBody2D

const SPEED = ${properties.speed}.0
const JUMP_VELOCITY = ${properties.jumpForce}.0

var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("ui_accept") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    var direction = Input.get_axis("ui_left", "ui_right")
    if direction:
        velocity.x = direction * SPEED
    else:
        velocity.x = move_toward(velocity.x, 0, SPEED)

    move_and_slide()`}
                  </pre>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </aside>
      </div>

      {/* Mobile Control Bar - Overlay */}
      <div className="md:hidden flex border-t bg-white h-16 items-center justify-around px-4">
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none">
            <Layers className="h-5 w-5" />
            <span className="text-[10px]">Nodes</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none">
            <Settings className="h-5 w-5" />
            <span className="text-[10px]">Inspect</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none">
            <Zap className="h-5 w-5" />
            <span className="text-[10px]">AI</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex flex-col gap-1 items-center h-full w-full rounded-none">
            <Rocket className="h-5 w-5" />
            <span className="text-[10px]">Export</span>
          </Button>
      </div>
    </div>
  );
}
