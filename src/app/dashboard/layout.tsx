import type { Metadata } from 'next';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building, DollarSign, Home, LayoutDashboard, MessageSquare, Settings } from 'lucide-react';
import { Toaster } from "@/components/ui/toaster";
import DashboardHeader from '@/components/dashboard-header';

export const metadata: Metadata = {
  title: 'KirayaEase Dashboard',
  description: 'Manage your properties with ease.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-sidebar-primary-foreground" />
            <h1 className="text-xl font-semibold text-sidebar-primary-foreground">KirayaEase</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" tooltip="Dashboard">
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/properties" tooltip="Properties">
                <Building />
                Properties
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/rent-suggestion" isActive tooltip="AI Rent Suggestion">
                <DollarSign />
                AI Rent Suggestion
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/messaging" tooltip="Messages">
                <MessageSquare />
                Messages
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard/settings" tooltip="Settings">
                <Settings />
                Settings
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-3">
              <Avatar>
                  <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person face" />
                  <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                  <span className="font-semibold text-sm text-sidebar-foreground truncate">John Doe</span>
                  <span className="text-xs text-sidebar-foreground/70">Landlord</span>
              </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeader />
        <main className="p-4 sm:p-6 lg:p-8">
            {children}
            <Toaster />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
