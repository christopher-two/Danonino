import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

const memories = [
  {
    date: "14 de Febrero, 2021",
    title: "Nuestro Primer Beso",
    description: "Esa noche estrellada, bajo el viejo roble, cuando nuestros mundos se unieron en un instante mágico. Fue el comienzo de todo.",
    image: { src: "https://placehold.co/600x400.png", alt: "Primer beso", hint: "first kiss" },
  },
  {
    date: "20 de Julio, 2021",
    title: "El Viaje a la Playa",
    description: "Recorrimos la costa, con el sol en la piel y el viento en el pelo. Cada ola parecía celebrar nuestro amor. Construimos castillos de arena y sueños.",
    image: { src: "https://placehold.co/600x400.png", alt: "Viaje a la playa", hint: "beach trip" },
  },
  {
    date: "25 de Diciembre, 2022",
    title: "Nuestra Primera Navidad Juntos",
    description: "Las luces, los regalos, y el calor de la chimenea. Pero el mejor regalo fuiste tú, tu sonrisa iluminando la habitación.",
    image: { src: "https://placehold.co/600x400.png", alt: "Navidad juntos", hint: "christmas together" },
  },
  {
    date: "1 de Mayo, 2023",
    title: "Adoptamos a Nube",
    description: "Llegó a nuestras vidas esa pequeña bola de pelos y la llenó de alegría y travesuras. Nuestra familia creció ese día.",
    image: { src: "https://placehold.co/600x400.png", alt: "Nuestra mascota Nube", hint: "puppy adoption" },
  },
];

export default function TimelinePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold font-headline text-primary">Nuestra Historia de Amor</h1>
      <p className="text-center text-lg text-foreground/80 mb-16 max-w-2xl mx-auto">Un viaje a través del tiempo, reviviendo los momentos que han tejido el hermoso tapiz de nuestra vida juntos.</p>
      
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-border h-full border" style={{left: '50%'}}></div>
        {memories.map((memory, index) => (
          <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}>
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
