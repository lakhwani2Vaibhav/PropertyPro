'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, FileText, Menu, MessageSquare, PieChart, Users, Building, Wrench, Bot, Wand2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { notifications } from '@/lib/mock-data';
import { ModeToggle } from './mode-toggle';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: <PieChart className="h-4 w-4" /> },
  { href: '/dashboard/properties', label: 'Properties', icon: <Building className="h-4 w-4" /> },
  { href: '/dashboard/tenants', label: 'Tenants', icon: <Users className="h-4 w-4" /> },
  { href: '/dashboard/leases', label: 'Leases', icon: <FileText className="h-4 w-4" /> },
  { href: '/dashboard/messaging', label: 'Messaging', icon: <MessageSquare className="h-4 w-4" /> },
  { href: '/dashboard/maintenance', label: 'Maintenance', icon: <Wrench className="h-4 w-4" /> },
];

const aiLinks = [
    { href: '/dashboard/reports', label: 'Reports', icon: <PieChart className="h-4 w-4" /> },
    { href: '/dashboard/rent-suggestion', label: 'Rent Suggestion', icon: <Wand2 className="h-4 w-4" /> },
    { href: '/dashboard/assistant', label: 'AI Assistant', icon: <Bot className="h-4 w-4" /> },
]

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-card/60 backdrop-blur-lg sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
               <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center font-bold text-primary-foreground">P</div>
              <span className="font-bold text-xl text-foreground hidden sm:block">PropertyPro</span>
            </Link>
          </div>

          <div className="flex items-center justify-center flex-1">
             <nav className="hidden md:flex items-center gap-2 text-sm font-medium bg-muted p-1 rounded-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-muted-foreground transition-colors hover:text-foreground px-3 py-1.5 rounded-md flex items-center gap-2',
                     pathname === link.href ? 'text-foreground font-semibold bg-background shadow-sm' : ''
                  )}
                >
                  {link.icon} {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
             <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                   <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                <div className="p-2">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className="p-2 rounded-md hover:bg-accent flex items-start gap-3">
                      <div className="mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground">{n.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                 <div className="p-2 mt-2 border-t">
                    <Button variant="link" size="sm" className="w-full">View all notifications</Button>
                </div>
              </PopoverContent>
            </Popover>

            <ModeToggle />

            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="woman face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-4 w-72">
                    <Link href="/dashboard" className="flex items-center gap-2 mb-6">
                        <div className="h-6 w-6 bg-primary rounded-md flex items-center justify-center font-bold text-primary-foreground">P</div>
                        <span className="font-bold text-xl text-foreground">PropertyPro</span>
                    </Link>
                    <nav className="flex flex-col gap-2">
                      {navLinks.map((link) => (
                          <SheetClose asChild key={link.href}>
                          <Link
                              href={link.href}
                              className={cn(
                              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                              pathname === link.href ? 'bg-muted text-primary font-semibold' : ''
                              )}
                          >
                              {link.icon}
                              {link.label}
                          </Link>
                          </SheetClose>
                      ))}
                    </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
