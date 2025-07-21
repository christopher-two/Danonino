import 'server-only';
import { google } from 'googleapis';

const drive = google.drive('v3');

// Cache para evitar llamadas repetidas a la API durante la misma solicitud.
let imageCache: any[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 300000; // 5 minutos en milisegundos

async function getImagesFromDrive() {
  const now = Date.now();
  if (imageCache && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
    return imageCache;
  }

  try {
    // Para esta autenticación solo se necesita la API Key.
    // La carpeta y sus contenidos deben ser públicos.
    const folderId = process.env.DRIVE_FOLDER_ID;
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!folderId || !apiKey) {
      throw new Error("La carpeta de Drive o la clave de API no están configuradas en .env");
    }

    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, webViewLink, thumbnailLink)',
      key: apiKey,
      pageSize: 100, // Aumentamos el tamaño para obtener más imágenes
    });

    const files = res.data.files;
    if (!files || files.length === 0) {
      console.warn("No se encontraron imágenes en la carpeta de Google Drive o la carpeta está vacía.");
      return [];
    }

    const processedFiles = files.map(file => ({
      // Usamos thumbnailLink para vistas previas y webViewLink para una URL visible.
      // Para acceso directo al contenido, se necesitaría webContentLink, que es más complejo de manejar.
      // Modificamos thumbnailLink para obtener una imagen más grande.
      src: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+$/, '=s800') : `https://placehold.co/600x400.png`,
      alt: file.name || "Imagen de Drive",
      hint: "couple love", // Usamos un hint genérico
    }));
    
    imageCache = processedFiles;
    lastFetchTime = now;

    return processedFiles;

  } catch (error) {
    console.error("Error al obtener imágenes de Google Drive:", error);
    // En caso de error, devolvemos un conjunto de imágenes de muestra para que la app no se rompa.
    return getFallbackImages();
  }
}

function getFallbackImages(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    src: `https://placehold.co/600x400.png?text=Fallback+${i+1}`,
    alt: `Fallback image ${i+1}`,
    hint: "placeholder image",
  }));
}


// Función para obtener un subconjunto aleatorio de imágenes
async function getRandomImages(count: number) {
  const allImages = await getImagesFromDrive();
  if (allImages.length === 0) return getFallbackImages(count);

  const shuffled = allImages.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export async function getCollageImages() {
  // Solicitamos más imágenes para un collage denso
  return getRandomImages(20);
}

export async function getGalleryPhotos() {
  const allImages = await getImagesFromDrive();
   if (allImages.length === 0) return getFallbackImages(50);
   return allImages;
}

export async function getTimelineMemories() {
    const images = await getRandomImages(4);
    
    // Usamos las imágenes obtenidas para los recuerdos
    return [
        {
          date: "14 de Febrero, 2021",
          title: "Nuestro Primer Beso",
          description: "Esa noche estrellada, bajo el viejo roble, cuando nuestros mundos se unieron en un instante mágico. Fue el comienzo de todo.",
          image: images[0] || { src: "https://placehold.co/600x400.png", alt: "Primer beso", hint: "first kiss" },
        },
        {
          date: "20 de Julio, 2021",
          title: "El Viaje a la Playa",
          description: "Recorrimos la costa, con el sol en la piel y el viento en el pelo. Cada ola parecía celebrar nuestro amor. Construimos castillos de arena y sueños.",
          image: images[1] || { src: "https://placehold.co/600x400.png", alt: "Viaje a la playa", hint: "beach trip" },
        },
        {
          date: "25 de Diciembre, 2022",
          title: "Nuestra Primera Navidad Juntos",
          description: "Las luces, los regalos, y el calor de la chimenea. Pero el mejor regalo fuiste tú, tu sonrisa iluminando la habitación.",
          image: images[2] || { src: "https://placehold.co/600x400.png", alt: "Navidad juntos", hint: "christmas together" },
        },
        {
          date: "1 de Mayo, 2023",
          title: "Adoptamos a Nube",
          description: "Llegó a nuestras vidas esa pequeña bola de pelos y la llenó de alegría y travesuras. Nuestra familia creció ese día.",
          image: images[3] || { src: "https://placehold.co/600x400.png", alt: "Nuestra mascota Nube", hint: "puppy adoption" },
        },
    ];
}
