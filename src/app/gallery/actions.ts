
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const FormSchema = z.object({
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
    image?: string[];
  };
};

export async function addPhotoAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    image: formData.get("image"),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo subir la imagen.",
    };
  }

  const { image } = validatedFields.data;
  
  try {
    const imageFile = image as File;
    const storageRef = ref(storage, `imagenes/${Date.now()}-${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
  } catch(error) {
     console.error("Error al subir imagen:", error);
     return {
      message: "Error de almacenamiento: no se pudo subir la imagen.",
    };
  }

  revalidatePath("/gallery");
  revalidatePath("/");
  
  return {
    message: "¡Imagen subida con éxito!",
  }
}
