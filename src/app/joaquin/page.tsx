import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getJoaquinAdventures } from "@/lib/image-service";
import { PawPrint } from "lucide-react";

export default async function JoaquinPage() {
  const adventures = await getJoaquinAdventures();

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline text-primary flex items-center justify-center gap-3">
          <PawPrint className="w-8 h-8" />
          Las Aventuras de Joaquín
        </h1>
        <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto">
          Cada carpeta, una nueva aventura. Explora los momentos más divertidos y tiernos de nuestro pequeño explorador.
        </p>
      </div>

      {adventures.length > 0 ? (
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
          {adventures.map((adventure) => (
            <AccordionItem value={adventure.title} key={adventure.title}>
              <AccordionTrigger className="text-2xl font-headline text-primary/90 hover:text-primary">
                {adventure.title}
              </AccordionTrigger>
              <AccordionContent>
                {adventure.images.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-4">
                    {adventure.images.map((photo, index) => (
                       <div key={index} className="aspect-square relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          data-ai-hint={photo.hint}
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    Esta aventura todavía no tiene fotos.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <p>No se encontraron aventuras en la carpeta de Drive de Joaquín.</p>
          <p>Asegúrate de que la carpeta compartida contenga otras carpetas con imágenes.</p>
        </div>
      )}
    </div>
  );
}