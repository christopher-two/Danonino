export default function PlaylistPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-background"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, hsl(var(--primary) / 0.15), transparent 40%), radial-gradient(circle at 70% 60%, hsl(var(--accent) / 0.1), transparent 40%)',
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <div className="w-full shadow-2xl rounded-xl backdrop-blur-sm bg-background/20 p-2">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/7KEq3HSjd2aqxSJVm73Zk2?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
          <div className="w-full shadow-2xl rounded-xl backdrop-blur-sm bg-background/20 p-2">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/7xKCQnkp71J9mWwBouhYBq?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
