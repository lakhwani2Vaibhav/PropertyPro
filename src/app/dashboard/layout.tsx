import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard-header';
import { Toaster } from "@/components/ui/toaster";
import { AiAssistantWidget } from '@/components/ai-assistant-widget';

export const metadata: Metadata = {
  title: 'PropertyPro Dashboard',
  description: 'Manage your properties with ease.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <DashboardHeader />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
        {children}
      </main>
      <Toaster />
      <AiAssistantWidget />
    </div>
  );
}
