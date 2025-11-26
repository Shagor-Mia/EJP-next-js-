import { getEvents, getEventCategories } from "@/lib/data";
import { EventList } from "@/components/events/EventList";
import { EventSearch } from "@/components/events/EventSearch";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function EventsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    category?: string;
  };
}) {
  const query = searchParams?.query || "";
  const category = searchParams?.category || "";
  const events = await getEvents(query, category);
  const categories = await getEventCategories();

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">All Events</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find your next experience.
        </p>
      </div>
      <EventSearch categories={categories} />
      <Suspense fallback={<EventListSkeleton />}>
        <EventList events={events} />
      </Suspense>
    </div>
  );
}

function EventListSkeleton() {
  return (
     <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-[225px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
