import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Plus, Search, Settings, Rocket, Clock, Trash2, Edit2, Play } from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  const projects = [
    { id: '1', title: 'Neon Runner', type: '2D Platformer', date: '2 days ago', status: 'Published', img: 'https://picsum.photos/seed/neon/400/300' },
    { id: '2', title: 'Space Havoc', type: 'Top-down Shooter', date: '5 days ago', status: 'Draft', img: 'https://picsum.photos/seed/space/400/300' },
    { id: '3', title: 'Zen Puzzle', type: 'Puzzle', date: '1 week ago', status: 'Web Export', img: 'https://picsum.photos/seed/zen/400/300' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 border-b bg-white flex items-center px-4 md:px-8 justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Gamepad2 className="h-6 w-6 text-primary" />
          <h1 className="font-headline font-bold text-xl tracking-tight hidden sm:block">AIGameForge</h1>
        </div>
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search projects..."
              className="pl-9 bg-secondary/50 border-none focus-visible:ring-1"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center font-bold text-primary text-xs">
            JD
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-headline font-bold">Welcome back, John</h2>
            <p className="text-muted-foreground">Continue building your amazing game worlds.</p>
          </div>
          <Link href="/editor/new">
            <Button className="bg-primary hover:bg-primary/90 text-white font-headline h-12 px-6">
              <Plus className="mr-2 h-5 w-5" /> Create New Game
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-white border mb-6">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <Card key={p.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-video">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    data-ai-hint="game screenshot"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <Link href={`/editor/${p.id}`}>
                      <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button size="icon" variant="primary" className="rounded-full shadow-lg">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline font-bold text-lg">{p.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">{p.type}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      p.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <div className="flex items-center text-muted-foreground text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {p.date}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Rocket className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            {/* Empty State placeholder */}
            <Link href="/editor/new" className="h-full">
              <div className="border-2 border-dashed border-muted rounded-xl h-full min-h-[280px] flex flex-col items-center justify-center p-8 text-center space-y-4 hover:bg-white/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline font-bold">New Project</h3>
                  <p className="text-sm text-muted-foreground">Start a fresh adventure with AI assistance.</p>
                </div>
              </div>
            </Link>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
