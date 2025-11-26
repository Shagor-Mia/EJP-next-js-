import { AddEventForm } from "@/components/forms/AddEventForm";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AddEventPage() {
    return (
        <div className="container py-10">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Create a New Event</CardTitle>
                    <CardDescription>Fill out the form below to add your event to EventFlow.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AddEventForm />
                </CardContent>
            </Card>
        </div>
    );
}
