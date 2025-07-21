import 'server-only';
import { db } from './firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

interface Moment {
  id: string;
  date: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    hint: string;
  };
}

let momentCache: Moment[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 300000; // 5 minutos en milisegundos

async function getMomentsFromFirestore(): Promise<Moment[]> {
  const now = Date.now();
  if (momentCache && lastFetchTime && now - lastFetchTime < CACHE_DURATION) {
    return momentCache;
  }

  try {
    const momentsCollection = collection(db, 'moments');
    const q = query(momentsCollection, orderBy('date', 'desc'));
    const momentsSnapshot = await getDocs(q);

    const momentsList = momentsSnapshot.docs.map(doc => {
      const data = doc.data();
      const imageUrl = data.image?.src || data.image; // Handle both object and string format

      // A simple regex to extract a hint from the title or description
      let hint = "couple love";
      if (data.title) {
        const match = data.title.match(/\b(viaje|playa|aniversario|boda|fiesta|concierto|parque|montaña)\b/i);
        if (match) hint = match[0].toLowerCase();
      }

      return {
        id: doc.id,
        date: data.date,
        title: data.title,
        description: data.description,
        image: {
          src: imageUrl,
          alt: data.title || 'Recuerdo de Dany',
          hint: hint,
        },
      };
    }).filter(m => m.image.src); // Filter out moments without a valid image src
    
    momentCache = momentsList;
    lastFetchTime = now;
    
    return momentsList;
  } catch (error) {
    console.error("Error al obtener momentos desde Firestore:", error);
    return [];
  }
}

function getFallbackImages(count = 20) {
  return Array.from({ length: count }, (_, i) => ({
    src: `https://placehold.co/600x400.png`,
    alt: `Fallback image ${i + 1}`,
    hint: "placeholder image",
  }));
}


export async function getCollageImages() {
  const moments = await getMomentsFromFirestore();
  if (!moments.length) return getFallbackImages(40);
  return moments.map(m => m.image);
}

export async function getGalleryPhotos() {
  const moments = await getMomentsFromFirestore();
  if (!moments.length) return getFallbackImages(50);
  return moments.map(m => m.image);
}

export async function getTimelineMemories() {
  const moments = await getMomentsFromFirestore();
  if (!moments.length) {
    return [
      {
        id: 'fallback-1',
        date: "2024-01-01",
        title: "Recuerdo de Ejemplo",
        description: "Esta es una descripción de ejemplo. Parece que no se pudieron cargar tus recuerdos desde Firestore. ¡Asegúrate de que la colección 'moments' tenga datos!",
        image: { src: "https://placehold.co/600x400.png", alt: "Imagen de ejemplo", hint: "placeholder" },
      },
    ];
  }
  return moments;
}
