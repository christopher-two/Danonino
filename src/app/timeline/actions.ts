"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const FormSchema = z.object({
  title: z.string().min(1, { message: "El título es requerido." }),
  description: z.string().min(1, { message: "La descripción es requerida." }),
  date: z.date({ required_error: "La fecha es requerida." }),
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

  const { title, description, date } = validatedFields.data;
  
  // TODO: Implement file upload to Firebase Storage
  const image = "https://placehold.co/600x400.png";

  try {
    await addDoc(collection(db, 'moments'), {
      title,
      description,
      date: formatDate(date),
      image,
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
