
"use client";

import { useState, useEffect, useActionState, useTransition } from "react";
import { CalendarIcon, PlusCircle, Trash2, Edit, PartyPopper } from "lucide-react";
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
import { addEventAction, editEventAction, deleteEventAction, type EventFormState } from "@/app/eventos/actions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import type { Event } from "@/lib/image-service";


function SubmitButton({ isEditing }: { isEditing: boolean }) {
  return (
    <Button type="submit">
      {isEditing ? (
        <>
          <Edit className="mr-2 h-4 w-4" /> Guardar Cambios
        </>
      ) : (
        <>
          <PlusCircle className="mr-2 h-4 w-4" /> Añadir Evento
        </>
      )}
    </Button>
  );
}

function EventForm({ event, onFormSubmit }: { event?: Event; onFormSubmit: () => void }) {
  const { toast } = useToast();
  const isEditing = !!event;
  const [date, setDate] = useState<Date | undefined>(event?.date ? new Date(event.date) : undefined);
  
  const action = isEditing ? editEventAction : addEventAction;
  const initialState: EventFormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.errors) {
        toast({
          variant: "destructive",
          title: "Error",
          description: state.message,
        });
      } else {
        toast({
          title: "¡Éxito!",
          description: state.message,
        });
        setDate(undefined);
        onFormSubmit(); // Close dialog on success
      }
    }
  }, [state, toast, onFormSubmit]);

  return (
    <form action={dispatch} className="grid gap-4 py-4">
      {isEditing && <input type="hidden" name="id" value={event?.id} />}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Título</Label>
        <Input id="title" name="title" defaultValue={event?.title} className="col-span-3" />
        {state.errors?.title && <p className="col-span-4 text-right text-xs text-destructive">{state.errors.title[0]}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">Fecha</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: es }) : <span>Elige una fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
        </Popover>
        <input type="hidden" name="date" value={date?.toISOString() || ""} />
        {state.errors?.date && <p className="col-span-4 text-right text-xs text-destructive">{state.errors.date[0]}</p>}
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">Descripción</Label>
        <Textarea id="description" name="description" defaultValue={event?.description} className="col-span-3" />
        {state.errors?.description && <p className="col-span-4 text-right text-xs text-destructive">{state.errors.description[0]}</p>}
      </div>
      <DialogFooter>
        <DialogClose asChild><Button variant="ghost">Cancelar</Button></DialogClose>
        <SubmitButton isEditing={isEditing} />
      </DialogFooter>
    </form>
  );
}


export default function EventManager({ events }: { events: Event[] }) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (id: string) => {
    startTransition(async () => {
      const result = await deleteEventAction(id);
      toast({
        title: result.message.includes("Error") ? "Error" : "Éxito",
        description: result.message,
        variant: result.message.includes("Error") ? "destructive" : "default",
      });
    });
  }

  return (
    <>
      <div className="mb-8">
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Añadir Nuevo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Añadir un nuevo evento</DialogTitle>
              <DialogDescription>Completa los detalles de este momento especial.</DialogDescription>
            </DialogHeader>
            <EventForm onFormSubmit={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {events.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card key={event.id} className="text-left animate-in fade-in-0 slide-in-from-bottom-5 duration-700" style={{'animationDelay': `${index * 100}ms`}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PartyPopper className="text-accent" />
                  <span>{event.title}</span>
                </CardTitle>
                <CardDescription>{format(new Date(event.date), "d 'de' LLLL, yyyy", { locale: es })}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{event.description}</p>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEditClick(event)}><Edit className="w-4 h-4" /></Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon" disabled={isPending}><Trash2 className="w-4 h-4" /></Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>Esta acción no se puede deshacer. Esto eliminará permanentemente el evento.</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteClick(event.id)}>Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-10">Aún no hay eventos guardados. ¡Añade el primero!</p>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogDescription>Actualiza los detalles de este momento especial.</DialogDescription>
          </DialogHeader>
          <EventForm event={selectedEvent} onFormSubmit={() => setIsEditDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
