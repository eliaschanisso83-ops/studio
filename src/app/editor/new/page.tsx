"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gamepad2, Sparkles, ArrowLeft, Loader2, Rocket, Globe, Zap } from 'lucide-react';
import Link from 'next/link';

export default function NewProject() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    // Simulate API call to generateInitialGameProject
    setTimeout(() => {
      setIsGenerating(false);
      setStep(2);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-headline font-bold">New Adventure</h1>
          </div>
        </div>

        {step === 1 ? (
          <Card className="border-none shadow-xl bg-white overflow-hidden">
            <CardHeader className="bg-primary/5 border-b pb-8">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-bold text-sm tracking-widest uppercase">AI Engine</span>
              </div>
              <CardTitle className="text-2xl font-headline">What kind of game should we build?</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                Describe your game idea in detail. AI will generate the project structure, 
                core mechanics, and basic assets for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <Textarea 
                  placeholder="e.g. A fast-paced 2D platformer where you're a robot collecting energy cells. The world should have neon lights and challenging physics obstacles."
                  className="min-h-[160px] text-lg p-4 bg-secondary/20 focus-visible:ring-primary border-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                />
                <div className="flex flex-wrap gap-2">
                  {['2D Platformer', 'Top-down Shooter', 'Infinite Runner', 'Puzzle'].map(tag => (
                    <Button 
                      key={tag} 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full text-xs font-bold"
                      onClick={() => setPrompt(p => p ? `${p} It's a ${tag}.` : `A ${tag} where...`)}
                    >
                      + {tag}
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                className="w-full h-14 text-xl font-headline bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Generating your world...
                  </>
                ) : (
                  <>
                    <Rocket className="mr-3 h-6 w-6" />
                    Forge My Game
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <Card className="border-none shadow-xl bg-white p-8 space-y-8">
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Zap className="h-8 w-8" />
                   </div>
                   <div>
                      <h2 className="text-2xl font-headline font-bold">Forge Complete!</h2>
                      <p className="text-muted-foreground">"Neon Robot Heist" project initialized.</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="p-4 bg-secondary/20 rounded-xl space-y-2">
                      <h3 className="font-bold text-sm">Scripts Generated</h3>
                      <p className="text-xs text-muted-foreground">Player.gd, Enemy.gd, LevelManager.gd</p>
                   </div>
                   <div className="p-4 bg-secondary/20 rounded-xl space-y-2">
                      <h3 className="font-bold text-sm">Assets Prepared</h3>
                      <p className="text-xs text-muted-foreground">12 Sprites, 4 Sound Effects, 1 Font</p>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                   <Button 
                     className="w-full h-14 bg-primary text-white font-headline"
                     onClick={() => router.push('/editor/1')}
                   >
                     Enter Visual Editor
                   </Button>
                   <Button variant="outline" className="w-full h-12">
                     <Globe className="mr-2 h-4 w-4" /> Export Web Demo
                   </Button>
                </div>
             </Card>
          </div>
        )}

        <div className="text-center text-muted-foreground text-sm">
           Your game will be stored securely in your private repository.
        </div>
      </div>
    </div>
  );
}
