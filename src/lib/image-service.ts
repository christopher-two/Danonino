import 'server-only';
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { google } from 'googleapis';
import { unstable_noStore as noStore } from 'next/cache';


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

export interface Adventure {
  title: string;
  images: DriveImage[];
}

export interface Event {
  id: string;
  date: string;
  title: string;
  description: string;
}

const apiKey = process.env.GOOGLE_API_KEY;
const driveFolderId = process.env.DRIVE_FOLDER_ID;
const joaquinDriveFolderId = process.env.DRIVE_FOLDER_ID_JOAQUIN;

const drive = google.drive({
  version: 'v3',
  auth: apiKey,
});

async function getImagesFromDriveFolder(folderId: string): Promise<DriveImage[]> {
  if (!apiKey || !folderId) {
    console.warn('Google Drive API key or Folder ID is not configured.');
    return [];
  }

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, thumbnailLink)',
    });

    if (res.data.files && res.data.files.length > 0) {
      return res.data.files.map((file) => ({
        src: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, '=s800') : `https://placehold.co/600x400.png`,
        alt: file.name || 'Imagen de Dany',
        hint: 'couple love',
      }));
    }
  } catch (error) {
    console.error(`Error fetching images from Google Drive folder ${folderId}:`, error);
  }
  return [];
}


async function getMomentsFromFirestore(): Promise<Moment[]> {
  // This remains dynamic to show new memories instantly
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
  if (!driveFolderId) return getFallbackImages(40);
  const driveImages = await getImagesFromDriveFolder(driveFolderId);
  if (driveImages.length === 0) return getFallbackImages(40);
  return driveImages;
}

export async function getGalleryPhotos() {
  if (!driveFolderId) return getFallbackImages(50);
  const driveImages = await getImagesFromDriveFolder(driveFolderId);
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


// --- Joaquin's Adventures Logic ---

export async function getJoaquinAdventures(): Promise<Adventure[]> {
  if (!apiKey || !joaquinDriveFolderId) {
    console.warn("Google Drive API key or Joaquin's Folder ID is not configured.");
    return [];
  }

  try {
    const adventureFoldersRes = await drive.files.list({
      q: `'${joaquinDriveFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder'`,
      fields: 'files(id, name)',
    });

    const adventureFolders = adventureFoldersRes.data.files;
    if (!adventureFolders || adventureFolders.length === 0) {
      return [];
    }
    
    const adventures: Adventure[] = await Promise.all(
      adventureFolders.map(async (folder) => {
        const imagesRes = await drive.files.list({
          q: `'${folder.id}' in parents and mimeType contains 'image/'`,
          fields: 'files(id, name, thumbnailLink)',
        });

        const images = imagesRes.data.files ? imagesRes.data.files.map(file => ({
          src: file.thumbnailLink ? file.thumbnailLink.replace(/=s\d+/, '=s800') : `https://placehold.co/600x400.png`,
          alt: file.name || folder.name || 'Aventura de Joaquín',
          hint: 'dog pet',
        })) : [];

        return {
          title: folder.name || 'Aventura sin nombre',
          images: images,
        };
      })
    );

    return adventures.filter(adventure => adventure.images.length > 0).sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error fetching Joaquin's adventures from Google Drive:", error);
    return [];
  }
}

// --- Events Logic ---

export async function getEvents(): Promise<Event[]> {
  noStore(); // Always fetch the latest events
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
