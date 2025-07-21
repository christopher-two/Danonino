import Image from "next/image";

const collageImages = [
  { src: "https://placehold.co/400x600.png", hint: "couple smiling" },
  { src: "https://placehold.co/600x400.png", hint: "holding hands" },
  { src: "https://placehold.co/400x400.png", hint: "laughing together" },
  { src: "https://placehold.co/600x400.png", hint: "sunset kiss" },
  { src: "https://placehold.co/400x600.png", hint: "city date" },
  { src: "https://placehold.co/400x400.png", hint: "picnic park" },
  { src: "https://placehold.co/600x400.png", hint: "dancing kitchen" },
  { src: "https://placehold.co/400x600.png", hint: "mountain view" },
];

export default function Home() {
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
                  i % 8 === 0 ? 'w-1/4 h-1/3 top-[5%] left-[5%]' :
                  i % 8 === 1 ? 'w-1/3 h-1/4 top-[10%] right-[10%]' :
                  i % 8 === 2 ? 'w-1/5 h-1/4 top-[40%] left-[20%]' :
                  i % 8 === 3 ? 'w-1/4 h-1/3 top-[50%] right-[5%]' :
                  i % 8 === 4 ? 'w-1/3 h-1/4 bottom-[15%] left-[10%]' :
                  i % 8 === 5 ? 'w-1/6 h-1/5 top-[65%] left-[45%]' :
                  i % 8 === 6 ? 'w-1/4 h-1/4 bottom-[10%] right-[25%]' :
                                'w-1/5 h-1/3 top-[30%] right-[30%]'
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