import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { getTimelineMemories } from "@/lib/image-service";
import { AddMemoryForm } from "@/components/timeline/add-memory-form";

export default async function TimelinePage() {
  const memories = await getTimelineMemories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary">Nuestra Historia de Amor</h1>
        <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto">Un viaje a través del tiempo, reviviendo los momentos que han tejido el hermoso tapiz de nuestra vida juntos.</p>
        <div className="mt-6">
          <AddMemoryForm />
        </div>
      </div>
      
      <div className="relative wrap overflow-hidden p-4 md:p-10 h-full">
        <div className="absolute border-opacity-20 border-border h-full border-2 left-6 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2"></div>
        {memories.map((memory, index) => (
          <div key={memory.id || index} className={`mb-8 flex md:justify-between items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="order-1 w-5/12 hidden md:block"></div>
            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
              <Heart className="mx-auto font-semibold text-sm text-primary-foreground" size={16} />
            </div>
            <div className="order-1 w-full md:w-5/12 pl-8 md:px-6 py-4 animate-in fade-in-0 duration-700">
              <Card>
                {memory.image && (
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={memory.image.src}
                      alt={memory.image.alt}
                      fill
                      className="object-cover rounded-t-lg"
                      data-ai-hint={memory.image.hint}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <p className="text-sm text-muted-foreground">{memory.date}</p>
                  <CardTitle className="font-headline text-primary">{memory.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{memory.description}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
