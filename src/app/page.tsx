import Image from "next/image";
import { getCollageImages } from "@/lib/image-service";

export default function Home() {
  const collageImages = getCollageImages();
  
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-56px)] text-center p-4 overflow-hidden">
      <div className="absolute inset-0 w-full h-full -z-20">
        <div className="relative w-full h-full">
          {collageImages.map((img, i) => (
             <Image
              key={i}
              src={img.src}
              alt="Collage image"
              width={200}
              height={300}
              data-ai-hint={img.hint}
              className={`absolute object-cover animate-in fade-in-0 duration-1000
                ${
                  i % 12 === 0 ? 'w-1/4 h-1/3 top-[5%] left-[5%]' :
                  i % 12 === 1 ? 'w-1/3 h-1/4 top-[10%] right-[10%]' :
                  i % 12 === 2 ? 'w-1/5 h-1/4 top-[40%] left-[20%]' :
                  i % 12 === 3 ? 'w-1/4 h-1/3 top-[50%] right-[5%]' :
                  i % 12 === 4 ? 'w-1/3 h-1/4 bottom-[15%] left-[10%]' :
                  i % 12 === 5 ? 'w-1/6 h-1/5 top-[65%] left-[45%]' :
                  i % 12 === 6 ? 'w-1/4 h-1/4 bottom-[10%] right-[25%]' :
                  i % 12 === 7 ? 'w-1/5 h-1/3 top-[30%] right-[30%]' :
                  i % 12 === 8 ? 'w-1/6 h-1/4 top-[8%] right-[40%]' :
                  i % 12 === 9 ? 'w-1/5 h-1/5 bottom-[5%] left-[40%]' :
                  i % 12 === 10 ? 'w-1/4 h-1/4 top-[70%] right-[60%]' :
                                 'w-1/5 h-1/3 bottom-[20%] right-[80%]'
                }
              `}
            />
          ))}
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
