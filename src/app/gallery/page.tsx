import Image from "next/image";

const photos = [
  { src: "https://placehold.co/400x400.png", alt: "Recuerdo de un día soleado", hint: "couple beach" },
  { src: "https://placehold.co/400x400.png", alt: "Cena romántica", hint: "romantic dinner" },
  { src: "https://placehold.co/400x400.png", alt: "Paseo por la ciudad", hint: "city walk" },
  { src: "https://placehold.co/400x400.png", alt: "Celebrando nuestro aniversario", hint: "anniversary celebration" },
  { src: "https://placehold.co/400x400.png", alt: "Aventura en la montaña", hint: "mountain adventure" },
  { src: "https://placehold.co/400x400.png", alt: "Atardecer juntos", hint: "sunset silhouette" },
  { src: "https://placehold.co/400x400.png", alt: "Risas y café", hint: "coffee date" },
  { src: "https://placehold.co/400x400.png", alt: "Un abrazo cálido", hint: "warm hug" },
  { src: "https://placehold.co/400x400.png", alt: "Bajo la lluvia", hint: "kissing rain" },
  { src: "https://placehold.co/400x400.png", alt: "Mirada cómplice", hint: "knowing glance" },
  { src: "https://placehold.co/400x400.png", alt: "Bailando juntos", hint: "dancing together" },
  { src: "https://placehold.co/400x400.png", alt: "Explorando nuevos lugares", hint: "exploring city" },
];

export default function GalleryPage() {
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