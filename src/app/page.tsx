import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 bg-primary rounded-sm" />
            <h1 className="text-2xl font-bold">PropertyPro</h1>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link href="/login" passHref>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register" passHref>
              <Button>
                Sign Up <ArrowRight className="ml-2 h-4 w-4 hidden sm:block" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <section className="relative py-16 md:py-24">
          <div className="absolute inset-0">
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Modern building background"
              fill
              className="object-cover"
              data-ai-hint="building architecture"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
              Property Management, Simplified.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
              PropertyPro provides the tools you need to manage your properties efficiently. From leases to payments, we've got you covered.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/dashboard" passHref>
                <Button size="lg" variant="secondary">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} PropertyPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
