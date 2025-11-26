import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export function Hero() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'concert');

  return (
    <section className="relative w-full h-[70vh] max-h-[800px] overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
      <div className="relative container h-full flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Experience Events Like Never Before
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-200 sm:text-xl">
          Discover, create, and share unforgettable moments with EventFlow. Your gateway to the most exciting events.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/events">Explore Events</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/add-event">Create an Event</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
