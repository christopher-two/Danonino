import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, PlayCircle } from "lucide-react";

const playlist = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    description: "Porque nuestra historia es simplemente perfecta, como la canción. Cada palabra describe lo que siento por ti.",
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    description: "Sentí que te había esperado toda la vida, y te esperaría mil años más. Esta canción es nuestro para siempre.",
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    description: "Para cuando seamos viejitos, y nuestro amor siga siendo tan fuerte y joven como ahora. Te amaré hasta los 70.",
  },
  {
    title: "All of Me",
    artist: "John Legend",
    description: "Te amo con todo lo que soy, con mis curvas y mis bordes, mis perfectas imperfecciones. Y tú me amas igual.",
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    description: "Eras mi luz amarilla, mi estrella brillante en un cielo oscuro. Todo lo que haces es magia.",
  },
];

export default function PlaylistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold font-headline text-primary">Nuestra Banda Sonora</h1>
      <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">Cada canción, una nota en la melodía de nuestro amor. La música que ha acompañado nuestros mejores momentos.</p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {playlist.map((song, index) => (
          <Card key={index} className="flex flex-col animate-in fade-in-0 zoom-in-95 duration-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="font-headline">{song.title}</CardTitle>
                <CardDescription>{song.artist}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-foreground/90">{song.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-primary hover:text-primary hover:bg-primary/10">
                <PlayCircle className="mr-2 h-5 w-5" />
                Escuchar ahora
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
