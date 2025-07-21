
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { addDoc, collection, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const EventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "El título es requerido." }),
  description: z.string().min(1, { message: "La descripción es requerida." }),
  date: z.date({ required_error: "La fecha es requerida." }),
});

export type EventFormState = {
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    date?: string[];
  };
};

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function addEventAction(
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  const rawFormData = {
    title: formData.get("title"),
    description: formData.get("description"),
    date: formData.get("date"),
  };

  const validatedFields = EventSchema.safeParse({
    ...rawFormData,
    date: rawFormData.date ? new Date(rawFormData.date as string) : undefined,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Faltan campos. No se pudo crear el evento.",
    };
  }

  const { title, description, date } = validatedFields.data;

  try {
    await addDoc(collection(db, 'events'), {
      title,
      description,
      date: formatDate(date),
    });
  } catch (error) {
    console.error("Error al añadir evento:", error);
    return {
      message: "Error de base de datos: no se pudo crear el evento.",
    };
  }

  revalidatePath("/eventos");
  return { message: "Evento añadido con éxito." };
}

export async function editEventAction(
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
    const rawFormData = {
        id: formData.get("id"),
        title: formData.get("title"),
        description: formData.get("description"),
        date: formData.get("date"),
    };

    if (!rawFormData.id || typeof rawFormData.id !== 'string') {
        return { message: "Error: ID de evento no válido." };
    }

    const validatedFields = EventSchema.safeParse({
        ...rawFormData,
        date: rawFormData.date ? new Date(rawFormData.date as string) : undefined,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Faltan campos. No se pudo editar el evento.",
        };
    }

    const { id, title, description, date } = validatedFields.data;

    try {
        const eventRef = doc(db, 'events', id!);
        await updateDoc(eventRef, {
            title,
            description,
            date: formatDate(date),
        });
    } catch (error) {
        console.error("Error al editar evento:", error);
        return { message: "Error de base de datos: no se pudo editar el evento." };
    }

    revalidatePath("/eventos");
    return { message: "Evento editado con éxito." };
}

export async function deleteEventAction(id: string): Promise<{ message: string }> {
  if (!id) {
    return { message: "Error: ID de evento no válido." };
  }

  try {
    await deleteDoc(doc(db, "events", id));
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    return { message: "Error de base de datos: no se pudo eliminar el evento." };
  }
  
  revalidatePath("/eventos");
  return { message: "Evento eliminado con éxito." };
}
