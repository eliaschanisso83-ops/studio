
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Lock, 
  Mail, 
  Loader2, 
  ArrowLeft,
  ShieldCheck,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { Logo } from '@/components/logo';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) router.push('/dashboard');
    };
    checkUser();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      toast({ variant: "destructive", title: "AUTH_ERROR", description: error.message });
      setIsLoading(false);
    } else {
      toast({ title: "SESSÃO_INICIADA", description: "Sincronizando Cloud Vault..." });
      router.push('/dashboard');
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    
    if (error) {
      toast({ variant: "destructive", title: "REGISTRATION_ERROR", description: error.message });
      setIsLoading(false);
    } else {
      toast({ title: "VERIFICAÇÃO_PENDENTE", description: "Confirme seu e-mail para ativar o acesso." });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-4 font-body scanline">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white/40 hover:text-white gap-2">
            <ArrowLeft className="h-4 w-4" /> Voltar
          </Button>
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Logo size={60} showText={false} />
          <div className="space-y-1">
            <h1 className="font-headline font-bold text-3xl tracking-tighter uppercase italic text-white">
              Neural_Access_<span className="text-primary">Point</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Protocolo de Identidade Digital</p>
          </div>
        </div>

        <Card className="glass-panel border-white/5 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 bg-black/40 p-1 rounded-none border-b border-white/5">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold uppercase text-[9px] tracking-widest h-10">Sign_In</TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold uppercase text-[9px] tracking-widest h-10">Register</TabsTrigger>
            </TabsList>

            <CardContent className="p-8">
              <TabsContent value="login" className="m-0 space-y-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[8px] font-bold uppercase text-white/40 ml-1">E-mail_Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/20" />
                      <Input 
                        type="email" 
                        placeholder="nome@dominio.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/60 border-white/10 pl-10 h-11 text-xs focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[8px] font-bold uppercase text-white/40 ml-1">Secure_Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/20" />
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-black/60 border-white/10 pl-10 h-11 text-xs focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-11 bg-primary hover:bg-primary/90 text-black font-headline font-bold uppercase tracking-widest text-[10px] neo-button mt-4"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Authenticate_Access'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="m-0 space-y-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2 text-left">
                    <label className="text-[8px] font-bold uppercase text-white/40 ml-1">E-mail_Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-white/20" />
                      <Input 
                        type="email" 
                        placeholder="seu@email.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/60 border-white/10 pl-10 h-11 text-xs focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-left">
                    <label className="text-[8px] font-bold uppercase text-white/40 ml-1">Create_Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-white/20" />
                      <Input 
                        type="password" 
                        placeholder="Mínimo 6 caracteres" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-black/60 border-white/10 pl-10 h-11 text-xs focus:border-primary/50 transition-all"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="w-full h-11 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-headline font-bold uppercase tracking-widest text-[10px] mt-4"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Forge_Identity'}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="flex items-center justify-center gap-6 pt-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3 w-3 text-primary" />
            <span className="text-[7px] font-bold uppercase tracking-widest text-white/20">SSL_Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-3 w-3 text-accent" />
            <span className="text-[7px] font-bold uppercase tracking-widest text-white/20">Supabase_Cloud</span>
          </div>
        </div>
      </div>
    </div>
  );
}
