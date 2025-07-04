import type { Metadata } from 'next';
import DashboardHeader from '@/components/dashboard-header';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'PropertyPro Dashboard',
  description: 'Manage your properties and performance.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <DashboardHeader />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Toaster />
    </div>
  );
}
