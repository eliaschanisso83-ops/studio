import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Plus, Search, Settings, Rocket, Clock, Trash2, Edit2, Play, ExternalLink, Zap } from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  const projects = [
    { id: '1', title: 'Neon Runner', type: '2D Platformer', date: '2 days ago', status: 'Published', img: 'https://picsum.photos/seed/neon/400/300', accent: 'primary' },
    { id: '2', title: 'Space Havoc', type: 'Top-down Shooter', date: '5 days ago', status: 'Draft', img: 'https://picsum.photos/seed/space/400/300', accent: 'accent' },
    { id: '3', title: 'Zen Puzzle', type: 'Puzzle', date: '1 week ago', status: 'Web Export', img: 'https://picsum.photos/seed/zen/400/300', accent: 'blue-400' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="h-16 border-b border-white/5 bg-black/40 backdrop-blur-xl flex items-center px-4 md:px-8 justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary/20 p-1.5 rounded-lg">
            <Gamepad2 className="h-6 w-6 text-primary" />
          </div>
          <h1 className="font-headline font-bold text-xl tracking-tighter hidden sm:block">
            AI<span className="text-primary">Game</span>Forge
          </h1>
        </div>
        
        <div className="flex-1 max-w-md mx-8 hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary focus-visible:bg-white/10 transition-all rounded-full h-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-white/5">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-xs font-bold text-white">John Doe</span>
              <span className="text-[10px] text-primary uppercase tracking-widest font-bold">Pro Dev</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 p-px">
              <div className="w-full h-full rounded-xl bg-black flex items-center justify-center font-bold text-primary text-sm">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white tracking-tighter">The Workshop</h2>
            <p className="text-white/40 font-medium">Continue architecting your virtual worlds.</p>
          </div>
          <Link href="/editor/new">
            <Button className="bg-primary hover:bg-primary/90 text-black font-headline font-bold h-14 px-8 neo-button rounded-xl">
              <Plus className="mr-2 h-6 w-6" /> Forge New Game
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl h-12">
              <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-lg px-6 font-bold uppercase tracking-widest text-[10px]">All Projects</TabsTrigger>
              <TabsTrigger value="published" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-lg px-6 font-bold uppercase tracking-widest text-[10px]">Published</TabsTrigger>
              <TabsTrigger value="drafts" className="data-[state=active]:bg-primary data-[state=active]:text-black rounded-lg px-6 font-bold uppercase tracking-widest text-[10px]">Drafts</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2 text-white/40 text-xs font-bold">
              <Clock className="h-4 w-4" />
              <span>TOTAL PLAYTIME: 1,240h</span>
            </div>
          </div>
          
          <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 m-0">
            {projects.map((p) => (
              <Card key={p.id} className="glass-card group overflow-hidden border-white/5 hover:border-primary/40 transition-all duration-500 rounded-2xl flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                    data-ai-hint="game screenshot"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <Link href={`/editor/${p.id}`}>
                      <Button variant="secondary" className="rounded-xl font-bold neo-button h-12 px-6">
                        <Edit2 className="h-4 w-4 mr-2" /> EDIT
                      </Button>
                    </Link>
                    <Button variant="primary" className="rounded-xl h-12 w-12 neo-button flex items-center justify-center p-0">
                      <Play className="h-5 w-5 fill-current" />
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/20 ${
                      p.status === 'Published' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-6 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="font-headline font-bold text-2xl text-white group-hover:text-primary transition-colors">{p.title}</CardTitle>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">{p.type}</p>
                  </div>
                </CardHeader>
                <div className="flex-1" />
                <CardFooter className="p-6 pt-4 flex justify-between items-center border-t border-white/5 mt-4">
                  <div className="flex items-center text-white/40 text-xs font-medium">
                    <Clock className="h-3.5 w-3.5 mr-2" />
                    {p.date}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-white/20 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-white/20 hover:text-primary hover:bg-primary/10 rounded-xl transition-all">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Link href="/editor/new" className="h-full">
              <div className="border-2 border-dashed border-white/10 rounded-2xl h-full min-h-[340px] flex flex-col items-center justify-center p-10 text-center space-y-6 hover:bg-white/5 hover:border-primary/50 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                  <Plus className="h-8 w-8 text-white/20 group-hover:text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-headline font-bold text-xl text-white">Initialize Core</h3>
                  <p className="text-sm text-white/30 font-medium max-w-[180px] mx-auto">Start a new neural project with AI assistance.</p>
                </div>
              </div>
            </Link>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}