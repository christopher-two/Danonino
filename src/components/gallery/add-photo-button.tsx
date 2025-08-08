
"use client";

import { useState, useEffect, useActionState, useRef } from "react";
import { PlusCircle, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { addPhotoAction, type FormState } from "@/app/gallery/actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";

function SubmitButton() {
  return (
    <Button type="submit">
      <Upload className="mr-2 h-4 w-4" />
      Subir Fotos
    </Button>
  );
}

export function AddPhotoButton() {
  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initialState: FormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(addPhotoAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          variant: "destructive",
          title: "Error al subir las imágenes",
          description: state.message,
        });
      } else {
        toast({
          title: "¡Éxito!",
          description: state.message,
        });
        formRef.current?.reset();
        setPreviews([]);
        setIsDialogOpen(false);
      }
    }
  }, [state, toast]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const filePromises = fileArray.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      Promise.all(filePromises)
        .then((base64Files) => {
          setPreviews(base64Files);
        })
        .catch((error) => {
          console.error("Error al leer los archivos:", error);
          setPreviews([]);
          toast({
            variant: "destructive",
            title: "Error",
            description: "No se pudieron previsualizar los archivos.",
          });
        });
    } else {
      setPreviews([]);
    }
  };
  
  if (!isClient) return null;


  return (
    <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
      if (!isOpen) {
        formRef.current?.reset();
        setPreviews([]);
      }
      setIsDialogOpen(isOpen);
    }}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
               <button className={cn(
                "flex items-center justify-center rounded-full p-2.5 text-sm font-medium transition-colors",
                "text-primary hover:bg-primary/20"
              )}>
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">Añadir Foto</span>
              </button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Añadir Foto a la Galería</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Añadir nuevas fotos</DialogTitle>
          <DialogDescription>
            Selecciona una o varias imágenes de tu dispositivo para añadirlas a la galería.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={dispatch} className="grid gap-4 py-4">
           <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="images">Imágenes</Label>
            <Input id="images" name="images" type="file" multiple accept="image/png, image/jpeg, image/webp" onChange={handleFileChange}/>
             {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {previews.map((src, index) => (
                    <div key={index} className="relative aspect-square w-full">
                        <img src={src} alt={`Vista previa de la imagen ${index + 1}`} className="rounded-md object-cover w-full h-full" />
                    </div>
                ))}
              </div>
            )}
            {state.errors?.images && (
              <p className="text-xs text-destructive">{state.errors.images.join(", ")}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancelar</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
