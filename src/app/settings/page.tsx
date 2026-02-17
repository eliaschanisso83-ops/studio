"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Key, Shield, User, Globe, Github, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="h-16 border-b bg-white flex items-center px-4 md:px-8 justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl tracking-tight">Settings</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        <Tabs defaultValue="api" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="api" className="gap-2"><Key className="h-4 w-4"/> AI API Keys</TabsTrigger>
            <TabsTrigger value="profile" className="gap-2"><User className="h-4 w-4"/> Profile</TabsTrigger>
            <TabsTrigger value="security" className="gap-2"><Shield className="h-4 w-4"/> Security</TabsTrigger>
          </TabsList>

          <TabsContent value="api">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">AI Connections</CardTitle>
                <CardDescription>
                  AIGameForge is free because you use your own API keys. 
                  Your keys are encrypted and never stored in plain text.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-primary/10">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">OpenAI (GPT-4o)</p>
                        <p className="text-xs text-muted-foreground">Connected • Primary Choice</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold">OpenAI API Key</label>
                    <div className="flex gap-2">
                      <Input type="password" value="sk-proj-••••••••••••••••" readOnly className="font-mono bg-secondary/20" />
                      <Button variant="outline">Update</Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-dashed">
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Google Gemini</p>
                        <p className="text-xs text-muted-foreground">Not Connected</p>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-dashed">
                    <div className="flex items-center gap-3 opacity-50">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <Info className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Anthropic Claude</p>
                        <p className="text-xs text-muted-foreground">Not Connected</p>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary">Connect</Button>
                  </div>
                </div>

                <div className="p-4 bg-orange-50 border border-orange-100 rounded-lg flex gap-3">
                   <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
                   <p className="text-xs text-orange-800 leading-relaxed">
                     Make sure your API keys have sufficient credits. 
                     Large project generations can consume several thousand tokens.
                   </p>
                </div>
              </CardContent>
              <CardFooter className="bg-secondary/10 p-4 justify-between">
                <p className="text-xs text-muted-foreground">Last updated: Oct 24, 2024</p>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {isSaved ? <><CheckCircle2 className="mr-2 h-4 w-4" /> Saved</> : 'Save Changes'}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Your Profile</CardTitle>
                <CardDescription>Manage how you appear in the community.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center gap-6 pb-6">
                    <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-white shadow-lg flex items-center justify-center font-headline font-bold text-3xl text-primary">
                      JD
                    </div>
                    <Button variant="outline">Change Avatar</Button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-sm font-bold">Display Name</label>
                       <Input defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-bold">Email Address</label>
                       <Input defaultValue="john@example.com" disabled className="bg-secondary/30" />
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-bold">Bio</label>
                    <Input defaultValue="Independent game developer exploring AI-driven worlds." />
                 </div>
              </CardContent>
              <CardFooter className="bg-secondary/10 p-4 justify-end">
                <Button variant="ghost" className="text-destructive hover:bg-destructive/10 mr-2">Logout</Button>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">Save Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

// Icon helper since lucide doesn't have Zap exactly as I wanted but used it as proxy
function Zap(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.71 14 3h1l-2 9h7l-10 11.71h-1l2-9H4z" />
    </svg>
  );
}
