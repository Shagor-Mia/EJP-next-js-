import Link from 'next/link';
import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Ticket } from 'lucide-react';
import { UserNav } from '@/components/auth/UserNav';

export async function Navbar() {
  const session = await auth();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
  ];

  const loggedInLinks = [
    { href: '/add-event', label: 'Add Event' },
    { href: '/manage-events', label: 'Manage Events' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Ticket className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              EventFlow
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                {link.label}
              </Link>
            ))}
            {session?.user && loggedInLinks.map(link => (
               <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
             <Link href="/" className="mr-6 flex items-center space-x-2">
                <Ticket className="h-6 w-6 text-primary" />
                <span className="font-bold">EventFlow</span>
            </Link>
            <div className="flex flex-col space-y-3 pt-6">
                {[...navLinks, ...(session?.user ? loggedInLinks : [])].map(link => (
                    <Link key={link.href} href={link.href} className="text-foreground/80 hover:text-foreground">
                        {link.label}
                    </Link>
                ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {session?.user ? (
            <UserNav user={session.user} />
          ) : (
            <nav className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Sign Up</Link>
              </Button>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
