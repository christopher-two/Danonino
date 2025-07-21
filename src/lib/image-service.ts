import 'server-only';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { unstable_noStore as noStore } from 'next/cache';
import { google } from 'googleapis';

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

interface DriveImage {
  src: string;
  alt: string;
  hint: string;
}

const apiKey = process.env.GOOGLE_API_KEY;
const folderId = process.env.DRIVE_FOLDER_ID;

const drive = google.drive({
  version: 'v3',
  auth: apiKey,
});

async function getImagesFromDrive(): Promise<DriveImage[]> {
  if (!apiKey || !folderId) {
    console.warn('Google Drive API key or Folder ID is not configured.');
    return [];
  }

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, thumbnailLink)',
      key: apiKey,
    });

    if (res.data.files && res.data.files.length > 0) {
      return res.data.files.map((file) => ({
        src: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, '=s800') : `https://placehold.co/600x400.png`,
        alt: file.name || 'Imagen de Dany',
        hint: 'couple love',
      }));
    }
  } catch (error) {
    console.error('Error fetching images from Google Drive:', error);
  }
  return [];
}


async function getMomentsFromFirestore(): Promise<Moment[]> {
  noStore();
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
  const driveImages = await getImagesFromDrive();
  if (driveImages.length === 0) return getFallbackImages(40);
  return driveImages;
}

export async function getGalleryPhotos() {
  const driveImages = await getImagesFromDrive();
  if (driveImages.length === 0) return getFallbackImages(50);
  return driveImages;
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
