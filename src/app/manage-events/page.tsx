import { getEventsByUser } from "@/lib/data";
import { auth } from "@/lib/auth";
import { ManageEventsTable } from "@/components/events/ManageEventsTable";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { PlusCircle } from "lucide-react";

export default async function ManageEventsPage() {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        // This should be handled by middleware, but as a fallback
        return <div>Please log in to manage events.</div>;
    }

    const events = await getEventsByUser(userId);

    return (
        <div className="container py-10">
             <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Manage Your Events</h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Here you can view, edit, and delete your events.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/add-event">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Event
                    </Link>
                </Button>
            </div>
            
            <ManageEventsTable events={events} />
        </div>
    );
}
