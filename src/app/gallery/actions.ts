
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z
  .any()
  .refine((file) => file?.size > 0, "El archivo es requerido.")
  .refine((file) => file?.size <= MAX_FILE_SIZE, `El tamaño máximo del archivo es 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Solo se aceptan formatos .jpg, .jpeg, .png y .webp."
  );

const FormSchema = z.object({
  images: z.array(fileSchema).min(1, "Se requiere al menos una imagen."),
});


export type FormState = {
  message: string;
  errors?: {
    images?: string[];
  };
};

export async function addPhotoAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const imageFiles = formData.getAll("images");
  const validatedFields = FormSchema.safeParse({ images: imageFiles });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Hay errores en los archivos. No se pudieron subir las imágenes.",
    };
  }

  const { images } = validatedFields.data;
  
  try {
    const uploadPromises = images.map(image => {
      const imageFile = image as File;
      const storageRef = ref(storage, `imagenes/${Date.now()}-${imageFile.name}`);
      return uploadBytes(storageRef, imageFile);
    });

    await Promise.all(uploadPromises);

  } catch(error) {
     console.error("Error al subir imágenes:", error);
     return {
      message: "Error de almacenamiento: no se pudieron subir las imágenes.",
    };
  }

  revalidatePath("/gallery");
  revalidatePath("/");
  
  return {
    message: "¡Imágenes subidas con éxito!",
  }
}
