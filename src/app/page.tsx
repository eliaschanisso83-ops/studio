import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Gamepad2, Smartphone, Globe, Rocket, ShieldCheck, ChevronRight, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/30">
      <header className="px-6 h-20 flex items-center border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <Link className="flex items-center space-x-3 group" href="/">
          <div className="bg-primary/20 p-2 rounded-xl group-hover:scale-110 transition-transform">
            <Gamepad2 className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tighter text-white">
            AI<span className="text-primary">Game</span>Forge
          </span>
        </Link>
        <nav className="ml-auto flex items-center gap-8">
          <Link className="text-sm font-medium text-white/70 hover:text-primary transition-colors hidden md:block" href="#features">
            Engine
          </Link>
          <Link className="text-sm font-medium text-white/70 hover:text-primary transition-colors hidden md:block" href="#showcase">
            Community
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">Log In</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-black font-bold neo-button">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 lg:py-40 px-6 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-30" />
          <div className="container mx-auto text-center space-y-10 relative">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold bg-white/5 border border-white/10 text-primary-foreground backdrop-blur-md mb-4 animate-bounce">
              <Zap className="w-4 h-4 mr-2 text-accent" />
              <span>NEXT-GEN AI GAME ENGINE</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter max-w-5xl mx-auto leading-[0.9] text-white">
              Forge Worlds with <span className="text-gradient">Pure Thought</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl font-medium leading-relaxed">
              The first professional-grade game creator built for your phone. Use GenAI to architect logic, physics, and art in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-10 h-16 bg-primary hover:bg-primary/90 text-black font-headline font-bold neo-button group">
                  Build Your Empire <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-10 h-16 font-headline border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm">
                Explore Universe
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full py-24 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-headline font-bold text-white">Master the Forge</h2>
                <p className="text-white/50 max-w-xl text-lg">Pro tools re-engineered for a touch-first, AI-driven workflow.</p>
              </div>
              <div className="h-px bg-white/10 flex-1 mx-8 hidden md:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Architect",
                  desc: "Describe mechanics in natural language. Our AI writes the GDScript and structures the scene hierarchy.",
                  icon: Sparkles,
                  color: "text-primary"
                },
                {
                  title: "Tactile Inspector",
                  desc: "Zero boilerplate. Adjust gravity, speed, and shaders with precise gesture controls designed for mobile.",
                  icon: Smartphone,
                  color: "text-accent"
                },
                {
                  title: "Neural Assets",
                  desc: "Generate production-ready sprites, SFX, and textures instantly using integrated Genkit workflows.",
                  icon: Zap,
                  color: "text-blue-400"
                },
                {
                  title: "Cloud Forge",
                  desc: "Offload heavy builds to our remote clusters. Export to APK, AAB, or WebGL without heating your device.",
                  icon: Rocket,
                  color: "text-purple-400"
                },
                {
                  title: "Global Export",
                  desc: "One tap to publish. Share a playable web link or prepare your submission for the Play Store.",
                  icon: Globe,
                  color: "text-green-400"
                },
                {
                  title: "Secure Vault",
                  desc: "Your code, your keys. Connect your own AI providers and keep full ownership of every line generated.",
                  icon: ShieldCheck,
                  color: "text-red-400"
                }
              ].map((feature, i) => (
                <Card key={i} className="glass-card group hover:border-primary/50 transition-all duration-500 overflow-hidden relative">
                  <div className={`absolute -right-4 -top-4 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40 ${feature.color.replace('text', 'bg')}`} />
                  <CardContent className="p-10 space-y-6 relative">
                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${feature.color} border border-white/10 shadow-inner group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-white">{feature.title}</h3>
                    <p className="text-white/50 leading-relaxed font-medium">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -skew-y-3 translate-y-20" />
          <div className="container mx-auto px-6 text-center space-y-12 relative">
            <h2 className="text-4xl md:text-7xl font-headline font-bold text-white tracking-tighter">
              The future of gaming is <br/><span className="text-primary italic">in your hands.</span>
            </h2>
            <p className="text-white/40 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Join 50,000+ creators building the next generation of mobile experiences.
            </p>
            <div className="flex justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-headline h-20 px-16 text-2xl font-bold neo-button">
                  Forge Your Destiny
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-6 border-t border-white/5 bg-black/60">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-3">
            <Gamepad2 className="h-7 w-7 text-primary" />
            <span className="font-headline font-bold text-xl text-white">AIGameForge</span>
          </div>
          <p className="text-sm text-white/30 font-medium">
            © 2024 AIGameForge. Engineered for the next-gen creator.
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-white/40 hover:text-primary transition-colors font-bold uppercase tracking-widest">Docs</Link>
            <Link href="#" className="text-sm text-white/40 hover:text-primary transition-colors font-bold uppercase tracking-widest">Privacy</Link>
            <Link href="#" className="text-sm text-white/40 hover:text-primary transition-colors font-bold uppercase tracking-widest">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}