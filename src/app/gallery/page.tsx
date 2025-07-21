import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const photos = [
  { src: "https://placehold.co/600x400.png", alt: "Recuerdo de un día soleado", hint: "couple beach" },
  { src: "https://placehold.co/400x600.png", alt: "Cena romántica", hint: "romantic dinner" },
  { src: "https://placehold.co/600x400.png", alt: "Paseo por la ciudad", hint: "city walk" },
  { src: "https://placehold.co/600x400.png", alt: "Celebrando nuestro aniversario", hint: "anniversary celebration" },
  { src: "https://placehold.co/400x600.png", alt: "Aventura en la montaña", hint: "mountain adventure" },
  { src: "https://placehold.co/600x400.png", alt: "Atardecer juntos", hint: "sunset silhouette" },
  { src: "https://placehold.co/600x400.png", alt: "Risas y café", hint: "coffee date" },
  { src: "https://placehold.co/400x600.png", alt: "Un abrazo cálido", hint: "warm hug" },
  { src: "https://placehold.co/600x400.png", alt: "Bajo la lluvia", hint: "kissing rain" },
];

export default function GalleryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold font-headline text-primary">Nuestra Galería de Recuerdos</h1>
      <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">Un vistazo a los momentos que atesoramos, cada foto una historia de nuestro amor.</p>
      
      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
        {photos.map((photo, index) => (
          <div key={index} className="mb-4 break-inside-avoid animate-in fade-in-0 zoom-in-95 duration-500">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={600}
                  height={400}
                  className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={photo.hint}
                />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
