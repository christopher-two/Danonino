
import { getEvents } from "@/lib/image-service";
import EventManager from "@/components/events/event-manager";

export default async function EventosPage() {
  const events = await getEvents();

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4 pt-24">
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 85%, hsl(var(--primary) / 0.1), transparent 40%), radial-gradient(circle at 85% 15%, hsl(var(--accent) / 0.1), transparent 40%)',
        }}
      />
      <div className="w-full max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold font-headline text-primary animate-in fade-in-0 slide-in-from-top-4 duration-700">
          Calendario de Momentos Especiales
        </h1>
        <p className="text-lg text-foreground/80 mt-2 mb-8 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-4 duration-700 delay-200">
          Aquí guardaremos un registro de nuestras fechas importantes, celebraciones y futuros planes.
        </p>

        <EventManager events={events} />
      </div>
    </div>
  );
}
