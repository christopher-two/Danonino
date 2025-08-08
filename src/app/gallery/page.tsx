import Image from "next/image";
import { getGalleryPhotos } from "@/lib/image-service";
import { AddPhotoButton } from "@/components/gallery/add-photo-button";

export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <div className="relative">
      <div className="fixed top-24 right-4 z-50">
        <AddPhotoButton />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5 pt-20">
        {photos.map((photo, index) => (
          <div key={index} className="aspect-square relative group">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={photo.hint}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
