'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

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
    <header className="bg-background top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
               <div className="h-5 w-5 bg-foreground rounded-sm" />
              <span className="font-bold text-xl text-foreground">PropertyPro</span>
            </Link>
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
