
import { CalendarDays, PartyPopper, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function EventosPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4">
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
        <p className="text-lg text-foreground/80 mt-2 mb-12 max-w-2xl mx-auto animate-in fade-in-0 slide-in-from-top-4 duration-700 delay-200">
          Aquí guardaremos un registro de nuestras fechas importantes, celebraciones y futuros planes.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-left animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-300">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PartyPopper className="text-accent" />
                        <span>Próximo Aniversario</span>
                    </CardTitle>
                    <CardDescription>25 de Diciembre, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>¡Nuestra próxima gran celebración! Un día para recordar y crear nuevos momentos inolvidables.</p>
                </CardContent>
            </Card>
             <Card className="text-left animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-400">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarDays className="text-accent" />
                        <span>Escapada de Fin de Semana</span>
                    </CardTitle>
                    <CardDescription>Fecha por definir</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Planeando una pequeña aventura para desconectar y disfrutar juntos. ¿Playa o montaña?</p>
                </CardContent>
            </Card>
             <Card className="text-left animate-in fade-in-0 slide-in-from-bottom-5 duration-700 delay-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="text-accent" />
                        <span>Reunión Familiar</span>
                    </CardTitle>
                     <CardDescription>Próximamente</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Un espacio para marcar las fechas de las próximas reuniones con nuestros seres queridos.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
