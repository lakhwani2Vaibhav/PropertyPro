'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/properties', label: 'Properties' },
  { href: '/dashboard/leases', label: 'Leases' },
  { href: '/dashboard/tenants', label: 'Tenants' },
  { href: '/dashboard/payments', label: 'Payments' },
  { href: '/dashboard/maintenance', label: 'Maintenance' },
];

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-background top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
             {/* Mobile Menu */}
             <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <div className="border-b p-4">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-foreground rounded-sm" />
                            <span className="font-bold text-xl text-foreground">PropertyPro</span>
                        </Link>
                    </div>
                    <nav className="flex-grow p-4 space-y-2">
                    {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                        <Link
                            href={link.href}
                            className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            pathname === link.href ? 'bg-muted text-primary font-semibold' : ''
                            )}
                        >
                            {link.label}
                        </Link>
                        </SheetClose>
                    ))}
                    </nav>
                </SheetContent>
              </Sheet>
            </div>
            
            <Link href="/dashboard" className="flex items-center gap-2">
               <div className="h-5 w-5 bg-foreground rounded-sm" />
              <span className="font-bold text-xl text-foreground hidden sm:block">PropertyPro</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-muted-foreground transition-colors hover:text-foreground',
                     pathname === link.href ? 'text-foreground font-semibold' : ''
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="icon" className="rounded-full bg-card hover:bg-accent">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="woman face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
