import Image from "next/image";
import { getGalleryPhotos } from "@/lib/image-service";

export default function GalleryPage() {
  const photos = getGalleryPhotos();

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5">
      {photos.map((photo, index) => (
        <div key={index} className="aspect-square relative">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint={photo.hint}
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
      ))}
    </div>
  );
}
