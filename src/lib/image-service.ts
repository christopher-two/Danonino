import 'server-only';
import { db, storage } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, listAll, getDownloadURL, list } from 'firebase/storage';

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

interface StorageImage {
  src: string;
  alt: string;
  hint: string;
}

export interface Adventure {
  title: string;
  images: StorageImage[];
}

export interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
}

const GALLERY_PATH = 'imagenes';
const JOAQUIN_PATH = 'joaquin';

async function getImagesFromStoragePath(path: string): Promise<StorageImage[]> {
  try {
    const folderRef = ref(storage, path);
    const res = await listAll(folderRef);
    const promises = res.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        src: url,
        alt: itemRef.name,
        hint: 'couple love',
      };
    });
    return Promise.all(promises);
  } catch (error) {
    console.error(`Error al obtener imágenes de Firebase Storage en la ruta ${path}:`, error);
    return [];
  }
}

async function getMomentsFromFirestore(): Promise<Moment[]> {
  try {
    const momentsCollection = collection(db, 'moments');
    const q = query(momentsCollection, orderBy('date', 'desc'));
    const momentsSnapshot = await getDocs(q);

    const momentsList = momentsSnapshot.docs.map(doc => {
      const data = doc.data();
      const imageUrl = data.image;

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
    }).filter(m => m.image.src);
    
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
  const storageImages = await getImagesFromStoragePath(GALLERY_PATH);
  if (storageImages.length === 0) return getFallbackImages(40);
  return storageImages;
}

export async function getGalleryPhotos() {
  const storageImages = await getImagesFromStoragePath(GALLERY_PATH);
  if (storageImages.length === 0) return getFallbackImages(50);
  return storageImages;
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

// --- Joaquin's Adventures Logic ---

export async function getJoaquinAdventures(): Promise<Adventure[]> {
  try {
    const joaquinFolderRef = ref(storage, JOAQUIN_PATH);
    const result = await list(joaquinFolderRef, { maxResults: 100 });
    
    const adventures: Adventure[] = await Promise.all(
      result.prefixes.map(async (folderRef) => {
        const adventureName = folderRef.name;
        const imagesRes = await listAll(folderRef);
        
        const images = await Promise.all(
          imagesRes.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
              src: url,
              alt: itemRef.name,
              hint: 'dog pet',
            };
          })
        );

        return {
          title: adventureName,
          images: images,
        };
      })
    );

    return adventures.filter(adventure => adventure.images.length > 0).sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error al obtener las aventuras de Joaquín desde Firebase Storage:", error);
    return [];
  }
}

// --- Events Logic ---

export async function getEvents(): Promise<Event[]> {
  try {
    const eventsCollection = collection(db, 'events');
    const q = query(eventsCollection, orderBy('date', 'asc'));
    const eventsSnapshot = await getDocs(q);

    return eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Event));
  } catch (error) {
    console.error("Error al obtener eventos desde Firestore:", error);
    return [];
  }
}
