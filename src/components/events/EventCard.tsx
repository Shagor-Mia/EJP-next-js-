import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Event } from '@/lib/definitions';
import { Calendar, Tag } from 'lucide-react';

export function EventCard({ event }: { event: Event }) {
  const { id, title, description, price, date, imageUrl, category, priority } = event;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const priorityColor = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0 relative">
        <Link href={`/events/${id}`}>
          <Image
            src={imageUrl || 'https://picsum.photos/seed/placeholder/600/400'}
            alt={title}
            width={600}
            height={400}
            className="w-full h-48 object-cover"
            data-ai-hint="event placeholder"
          />
        </Link>
        <Badge className="absolute top-2 right-2">{price === 0 ? 'Free' : `$${price.toFixed(2)}`}</Badge>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className='flex justify-between items-start mb-2'>
            <Badge variant="secondary">{category}</Badge>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <div className={`h-2 w-2 rounded-full ${priorityColor[priority]}`}></div>
                {priority}
            </div>
        </div>
        <CardTitle className="text-lg font-bold leading-tight mb-2">
            <Link href={`/events/${id}`} className="hover:text-primary">{title}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formattedDate}</span>
        </div>
        <Button asChild size="sm">
          <Link href={`/events/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
