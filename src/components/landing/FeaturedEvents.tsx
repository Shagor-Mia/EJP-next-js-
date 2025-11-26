import { getEvents } from '@/lib/data';
import { EventCard } from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function FeaturedEvents() {
  const allEvents = await getEvents();
  const featuredEvents = allEvents.filter(e => e.priority === 'High').slice(0, 3);

  return (
    <section className="bg-secondary py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Events</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Check out some of the most popular upcoming events.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
