import { AiPoemGenerator } from "@/components/ai-poem-generator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Image as ImageIcon, Calendar, Music } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      >
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold font-headline mb-4 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        Para Dany, con todo mi amor
      </h1>
      <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10 animate-in fade-in-0 slide-in-from-top-4 duration-500 delay-100">
        Este es un pequeño rincón de nuestro universo, un lugar para celebrar cada risa, cada sueño, cada momento que te hace ser tú. Eres mi inspiración, mi alegría, mi todo.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-16 animate-in fade-in-0 duration-500 delay-200">
        <Button asChild size="lg">
          <Link href="/gallery"><ImageIcon className="mr-2"/> Ver Galería</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/timeline"><Calendar className="mr-2"/> Nuestra Historia</Link>
        </Button>
         <Button asChild variant="outline" size="lg">
          <Link href="/playlist"><Music className="mr-2"/> Playlist</Link>
        </Button>
      </div>
      
      <div className="animate-in fade-in-0 duration-500 delay-300">
        <AiPoemGenerator />
      </div>
    </div>
  );
}
