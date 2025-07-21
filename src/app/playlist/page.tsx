export default function PlaylistPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold font-headline text-primary">Nuestra Banda Sonora</h1>
      <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">Cada canción, una nota en la melodía de nuestro amor. La música que ha acompañado nuestros mejores momentos.</p>
      
      <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
        <iframe 
          style={{borderRadius: "12px"}} 
          src="https://open.spotify.com/embed/playlist/7KEq3HSjd2aqxSJVm73Zk2?utm_source=generator" 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>

        <iframe 
          style={{borderRadius: "12px"}} 
          src="https://open.spotify.com/embed/playlist/7xKCQnkp71J9mWwBouhYBq?utm_source=generator" 
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy">
        </iframe>
      </div>
    </div>
  );
}
