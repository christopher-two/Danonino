// En un futuro, este archivo puede ser modificado para obtener imágenes
// desde un servicio externo como Google Drive.

// Por ahora, devolveremos datos estáticos.

export function getCollageImages() {
  return [
    { src: "https://placehold.co/400x600.png", hint: "couple smiling" },
    { src: "https://placehold.co/600x400.png", hint: "holding hands" },
    { src: "https://placehold.co/400x400.png", hint: "laughing together" },
    { src: "https://placehold.co/600x400.png", hint: "sunset kiss" },
    { src: "https://placehold.co/400x600.png", hint: "city date" },
    { src: "https://placehold.co/400x400.png", hint: "picnic park" },
    { src: "https://placehold.co/600x400.png", hint: "dancing kitchen" },
    { src: "https://placehold.co/400x600.png", hint: "mountain view" },
    { src: "https://placehold.co/400x400.png", hint: "silly faces" },
    { src: "https://placehold.co/600x400.png", hint: "reading together" },
    { src: "https://placehold.co/400x600.png", hint: "beach selfie" },
    { src: "https://placehold.co/400x400.png", hint: "cooking together" },
  ];
}

export function getGalleryPhotos() {
    return [
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
}

export function getTimelineMemories() {
    return [
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
}
