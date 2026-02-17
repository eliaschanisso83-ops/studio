import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Gamepad2, Smartphone, Globe, Rocket, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center space-x-2" href="/">
          <Gamepad2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-headline font-bold text-primary tracking-tight">AIGameForge</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors flex items-center" href="#features">
            Features
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="hidden sm:flex">Log In</Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 bg-gradient-to-b from-background to-white">
          <div className="container mx-auto text-center space-y-8">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground mb-4">
              <Sparkles className="w-4 h-4 mr-2 text-accent" />
              <span>AI-Powered Game Development</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter max-w-4xl mx-auto leading-tight">
              Create and Publish Games <span className="text-primary">From Your Phone</span>
            </h1>
            <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl">
              Turn your ideas into playable games in minutes. No coding required. AI generates the logic, you refine the vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 h-14 bg-primary hover:bg-primary/90 font-headline">
                  Start Building Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 h-14 font-headline">
                View Community
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-headline font-bold">Why Choose AIGameForge?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Everything you need to go from idea to Play Store without touching a PC.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Project Generation",
                  desc: "Describe your game and our AI builds the Godot project structure and GDScripts automatically.",
                  icon: Sparkles
                },
                {
                  title: "Mobile Visual Editor",
                  desc: "Refine mechanics, tweak stats, and design scenes directly on your mobile device.",
                  icon: Smartphone
                },
                {
                  title: "Cloud Build System",
                  desc: "Export to Web, APK, and AAB using our high-performance remote build servers.",
                  icon: Rocket
                },
                {
                  title: "Your Own API Keys",
                  desc: "Connect your OpenAI, Gemini, or Claude keys. You control the AI and the costs.",
                  icon: ShieldCheck
                },
                {
                  title: "Web Publishing",
                  desc: "Instantly share your game as a web link. Perfect for testing and quick feedback.",
                  icon: Globe
                },
                {
                  title: "Play Store Ready",
                  desc: "Generate AAB files ready for the Google Play Console in a few taps.",
                  icon: Gamepad2
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-md bg-background/50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-headline font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30">
          <div className="container mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">Ready to build your masterpiece?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Join thousands of creators building the next generation of mobile games.
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline h-14 px-12 text-xl">
                Create Account Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 px-4 border-t bg-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold">AIGameForge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 AIGameForge. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
