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
      
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-border h-full border" style={{left: '50%'}}></div>
        {memories.map((memory, index) => (
          <div key={memory.id || index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
            <div className="order-1 w-5/12"></div>
            <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
              <Heart className="mx-auto font-semibold text-sm text-primary-foreground" size={16} />
            </div>
            <div className="order-1 w-5/12 px-6 py-4 animate-in fade-in-0 duration-700">
              <Card>
                {memory.image && (
                  <Image
                    src={memory.image.src}
                    alt={memory.image.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover rounded-t-lg"
                    data-ai-hint={memory.image.hint}
                  />
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
