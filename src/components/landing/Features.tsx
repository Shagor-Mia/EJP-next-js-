import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, PlusCircle, CalendarCheck } from "lucide-react";

const features = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Discover Events",
    description: "Easily find events that match your interests with our powerful search and filtering tools.",
  },
  {
    icon: <PlusCircle className="w-8 h-8 text-primary" />,
    title: "Create & Share",
    description: "Effortlessly create your own events and share them with your community or the world.",
  },
  {
    icon: <CalendarCheck className="w-8 h-8 text-primary" />,
    title: "Manage with Ease",
    description: "Keep track of your events, attendees, and details all in one convenient dashboard.",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why Choose EventFlow?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to discover, create, and manage events successfully.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <Card key={i} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
