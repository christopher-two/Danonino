"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import type { Adventure } from "@/lib/image-service";

interface JoaquinAdventuresClientProps {
  adventures: Adventure[];
}

export function JoaquinAdventuresClient({ adventures }: JoaquinAdventuresClientProps) {
  const [selectedAdventure, setSelectedAdventure] = useState<Adventure | null>(null);

  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {adventures.map((adventure, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card 
                  className="overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  onClick={() => setSelectedAdventure(adventure)}
                >
                  <CardContent className="relative flex aspect-[4/3] items-center justify-center p-0">
                    {adventure.images.length > 0 ? (
                      <>
                        <Image
                          src={adventure.images[0].src}
                          alt={adventure.images[0].alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={adventure.images[0].hint}
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <h3 className="absolute bottom-4 left-4 text-2xl font-bold font-headline text-white z-10">
                          {adventure.title}
                        </h3>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-4">
                         <h3 className="text-2xl font-bold font-headline text-primary">
                          {adventure.title}
                        </h3>
                        <p className="text-muted-foreground mt-2">Sin fotos aún</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>

      <Dialog open={!!selectedAdventure} onOpenChange={(isOpen) => !isOpen && setSelectedAdventure(null)}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="font-headline text-3xl text-primary">{selectedAdventure?.title}</DialogTitle>
          </DialogHeader>
          <div className="h-full overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
              {selectedAdventure?.images.map((photo, index) => (
                <div key={index} className="aspect-square relative rounded-lg overflow-hidden shadow-lg group">
                   <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={photo.hint}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
