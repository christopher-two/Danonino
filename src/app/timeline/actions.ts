"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
  title: z.string().min(1, { message: "El título es requerido." }),
  description: z.string().min(1, { message: "La descripción es requerida." }),
  date: z.date({ required_error: "La fecha es requerida." }),
  image: z
    .any()
    .refine((file) => file?.size > 0, "La imagen es requerida.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño máximo de la imagen es 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Solo se aceptan formatos .jpg, .jpeg, .png y .webp."
    ),
});

export type FormState = {
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    date?: string[];
    image?: string[];
  };
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


export async function addMemoryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawFormData = {
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
    image: formData.get("image"),
  };

  const validatedFields = FormSchema.safeParse({
    ...rawFormData,
    date: rawFormData.date ? new Date(rawFormData.date as string) : undefined,
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo crear el recuerdo.",
    };
  }

  const { title, description, date, image } = validatedFields.data;
  
  let imageUrl = '';
  try {
    const imageFile = image as File;
    const storageRef = ref(storage, `moments/${Date.now()}-${imageFile.name}`);
    const snapshot = await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(snapshot.ref);
  } catch(error) {
     console.error("Error al subir imagen:", error);
     return {
      message: "Error de almacenamiento: no se pudo subir la imagen.",
    };
  }


  try {
    await addDoc(collection(db, 'moments'), {
      title,
      description,
      date: formatDate(date),
      image: imageUrl,
    });
  } catch (error) {
    console.error("Error al añadir documento:", error);
    return {
      message: "Error de base de datos: no se pudo crear el recuerdo.",
    };
  }

  revalidatePath("/timeline");
  revalidatePath("/");
  revalidatePath("/gallery");
  
  return {
    message: "Recuerdo añadido con éxito.",
  }
}
