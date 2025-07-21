"use client";

import { useState, useEffect, useActionState } from "react";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { format } from "date-fns";
import { es } from 'date-fns/locale';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { addMemoryAction, type FormState } from "@/app/timeline/actions";

function SubmitButton() {
  return (
    <Button type="submit">
      <PlusCircle className="mr-2 h-4 w-4" />
      Añadir Recuerdo
    </Button>
  );
}

export function AddMemoryForm() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const { toast } = useToast();

  const initialState: FormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(addMemoryAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          variant: "destructive",
          title: "Error al añadir recuerdo",
          description: state.message,
        });
      } else {
        toast({
          title: "¡Éxito!",
          description: state.message,
        });
        setDate(undefined);
        setIsDialogOpen(false);
      }
    }
  }, [state, toast]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2" />
          Añadir Recuerdo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Añadir un nuevo recuerdo</DialogTitle>
          <DialogDescription>
            Completa los detalles de este momento especial para añadirlo a vuestra historia.
          </DialogDescription>
        </DialogHeader>
        <form action={dispatch} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input id="title" name="title" className="col-span-3" />
            {state.errors?.title && (
              <p className="col-span-4 text-right text-xs text-destructive">{state.errors.title[0]}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Fecha
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : <span>Elige una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <input type="hidden" name="date" value={date?.toISOString()} />
             {state.errors?.date && (
              <p className="col-span-4 text-right text-xs text-destructive">{state.errors.date[0]}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Textarea id="description" name="description" className="col-span-3" />
             {state.errors?.description && (
              <p className="col-span-4 text-right text-xs text-destructive">{state.errors.description[0]}</p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              URL de Imagen
            </Label>
            <Input id="image" name="image" className="col-span-3" />
             {state.errors?.image && (
              <p className="col-span-4 text-right text-xs text-destructive">{state.errors.image[0]}</p>
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
