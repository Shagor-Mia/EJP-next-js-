import { getEventById } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag, DollarSign, BarChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = await params; // ⬅️ REQUIRED

  const event = await getEventById(p.id);

  if (!event) {
    notFound();
  }

  const formattedDate = new Date(event.date).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={
                event.imageUrl ||
                "https://picsum.photos/seed/placeholder-detail/1200/800"
              }
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            {event.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">{formattedDate}</span>
              </div>

              <div className="flex items-center">
                <DollarSign className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">
                  {event.price === 0
                    ? "Free Event"
                    : `$${event.price.toFixed(2)}`}
                </span>
              </div>

              <div className="flex items-center">
                <Tag className="h-5 w-5 mr-3 text-primary" />
                <Badge variant="outline">{event.category}</Badge>
              </div>

              <div className="flex items-center">
                <BarChart className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Priority: {event.priority}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
