import 'server-only';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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

// Cache para evitar llamadas repetidas a la API durante la misma solicitud.
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
    // Ordenamos por fecha descendente para tener los recuerdos más recientes primero
    const q = query(momentsCollection, orderBy('date', 'desc'));
    const momentsSnapshot = await getDocs(q);

    const momentsList = momentsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        date: data.date,
        title: data.title,
        description: data.description,
        image: {
          src: data.image,
          alt: data.title,
          hint: "couple love", // Hint genérico
        },
      };
    });
    
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
    src: `https://placehold.co/600x400.png?text=Fallback+${i + 1}`,
    alt: `Fallback image ${i + 1}`,
    hint: "placeholder image",
  }));
}

export async function getCollageImages() {
  const moments = await getMomentsFromFirestore();
  if (!moments.length) return getFallbackImages(20);
  // Devolvemos solo la parte de la imagen para el collage
  return moments.map(m => m.image);
}

export async function getGalleryPhotos() {
  const moments = await getMomentsFromFirestore();
  if (!moments.length) return getFallbackImages(50);
   // Devolvemos solo la parte de la imagen para la galería
  return moments.map(m => m.image);
}

export async function getTimelineMemories() {
  const moments = await getMomentsFromFirestore();
  if (!moments.length) {
    // Devolvemos datos de ejemplo si no hay nada en firestore
    return [
      {
        date: "Fecha de ejemplo",
        title: "Recuerdo de ejemplo",
        description: "Esta es una descripción de ejemplo. Conecta tu base de datos de Firestore para ver tus recuerdos.",
        image: { src: "https://placehold.co/600x400.png", alt: "Ejemplo", hint: "placeholder" },
      },
    ];
  }
  return moments;
}
