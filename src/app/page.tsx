import Image from "next/image";
import { getCollageImages } from "@/lib/image-service";

export default async function Home() {
  const collageImages = await getCollageImages();
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-20">
        <div className="relative w-full h-full">
          {collageImages.map((img, i) => {
            const positions = [
                // Fila superior
                'w-1/6 h-1/4 top-[2%] left-[5%]', 'w-1/5 h-1/3 top-[5%] left-[25%]', 'w-1/4 h-1/4 top-[3%] left-[50%]', 'w-1/5 h-1/3 top-[8%] left-[75%]', 'w-1/6 h-1/4 top-[4%] right-[5%]',
                // Fila media-alta
                'w-1/5 h-1/3 top-[30%] left-[10%]', 'w-1/4 h-1/4 top-[25%] left-[35%]', 'w-1/6 h-1/5 top-[35%] left-[60%]', 'w-1/5 h-1/3 top-[33%] right-[15%]',
                // Fila central
                'w-1/4 h-1/3 top-[50%] left-[2%]', 'w-1/5 h-1/4 top-[45%] left-[28%]', 'w-1/4 h-1/3 top-[55%] left-[50%]', 'w-1/5 h-1/4 top-[48%] right-[25%]', 'w-1/4 h-1/3 top-[52%] right-[2%]',
                // Fila media-baja
                'w-1/3 h-1/4 top-[70%] left-[15%]', 'w-1/5 h-1/3 top-[65%] left-[45%]', 'w-1/3 h-1/4 top-[72%] right-[10%]',
                // Fila inferior
                'w-1/4 h-1/4 bottom-[2%] left-[5%]', 'w-1/5 h-1/3 bottom-[5%] left-[30%]', 'w-1/6 h-1/4 bottom-[3%] left-[55%]', 'w-1/4 h-1/4 bottom-[4%] right-[5%]'
            ];
            const positionClass = positions[i % positions.length];

            return (
              <Image
                key={i}
                src={img.src}
                alt={img.alt}
                width={200}
                height={300}
                data-ai-hint={img.hint}
                className={`absolute object-cover animate-in fade-in-0 duration-1000 ${positionClass}`}
              />
            );
          })}
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-background/80 backdrop-blur-sm" />

      <div className="flex flex-col items-center justify-center z-10 p-4 rounded-lg">
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700 text-shadow-lg">
          Para Dany, con todo mi amor
        </h1>
        <p className="text-lg md:text-2xl text-foreground/90 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-top-4 duration-700 delay-200 text-shadow">
          Este es un pequeño rincón de nuestro universo, un lugar para celebrar cada risa, cada sueño, cada momento que te hace ser tú. Eres mi inspiración, mi alegría, mi todo.
        </p>
      </div>
    </div>
  );
}
