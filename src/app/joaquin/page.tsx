import { getJoaquinAdventures } from "@/lib/image-service";
import { JoaquinAdventuresClient } from "@/components/joaquin/joaquin-adventures-client";

export default async function JoaquinPage() {
  const adventures = await getJoaquinAdventures();

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
       <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 10% 20%, hsl(var(--primary) / 0.1), transparent 50%), radial-gradient(circle at 80% 90%, hsl(var(--accent) / 0.1), transparent 50%)',
        }}
      />
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-headline text-primary animate-in fade-in-0 slide-in-from-top-4 duration-700">
                Las Aventuras de Joaquín
            </h1>
            <p className="text-lg text-foreground/80 mt-2 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-4 duration-700 delay-200">
                Un vistazo a las travesuras y momentos inolvidables de nuestro amigo el ternurin.
            </p>
        </div>
        {adventures.length > 0 ? (
          <JoaquinAdventuresClient adventures={adventures} />
        ) : (
          <div className="text-center text-muted-foreground py-10">
            <p>No se encontraron aventuras en la carpeta de Drive de Joaquín.</p>
            <p>Asegúrate de que la carpeta compartida contenga otras carpetas con imágenes.</p>
          </div>
        )}
      </div>
    </div>
  );
}
