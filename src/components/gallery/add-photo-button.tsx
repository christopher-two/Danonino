
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
      Subir Foto
    </Button>
  );
}

export function AddPhotoButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const initialState: FormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(addPhotoAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          variant: "destructive",
          title: "Error al subir la imagen",
          description: state.message,
        });
      } else {
        toast({
          title: "¡Éxito!",
          description: state.message,
        });
        formRef.current?.reset();
        setPreview(null);
        setIsDialogOpen(false);
      }
    }
  }, [state, toast]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
      if (!isOpen) {
        formRef.current?.reset();
        setPreview(null);
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

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Añadir una nueva foto</DialogTitle>
          <DialogDescription>
            Selecciona una imagen de tu dispositivo para añadirla a la galería.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={dispatch} className="grid gap-4 py-4">
           <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="image">Imagen</Label>
            <Input id="image" name="image" type="file" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange}/>
             {preview && (
              <div className="mt-4 relative aspect-video w-full">
                <img src={preview} alt="Vista previa de la imagen" className="rounded-md object-contain w-full h-full" />
              </div>
            )}
            {state.errors?.image && (
              <p className="text-xs text-destructive">{state.errors.image[0]}</p>
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
