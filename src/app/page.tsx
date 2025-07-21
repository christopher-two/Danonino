import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Image as ImageIcon, Calendar, Music } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-56px)] text-center p-4">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      >
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>
      </div>

      <div className="flex flex-col items-center justify-center z-10">
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700">
          Para Dany, con todo mi amor
        </h1>
        <p className="text-lg md:text-2xl text-foreground/80 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-top-4 duration-700 delay-200">
          Este es un pequeño rincón de nuestro universo, un lugar para celebrar cada risa, cada sueño, cada momento que te hace ser tú. Eres mi inspiración, mi alegría, mi todo.
        </p>
      </div>
    </div>
  );
}
