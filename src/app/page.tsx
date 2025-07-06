import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

export default function Home() {
  return (
    <div className="theme-landing">
      <div className="relative flex h-screen flex-col text-white">
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 z-[-1]">
          <Image
            src="https://atrean.s3.ap-south-1.amazonaws.com/image-files/67ada587e6dc894b280be886/67ada45ce6dc894b280be885/67ada587e6dc894b280be886/building.svg"
            alt="Modern building background"
            fill
            className="object-cover"
            data-ai-hint="building cityscape"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 bg-primary rounded-md flex items-center justify-center">
                  <Sprout className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold">PropertyPro</h1>
            </div>
            <nav className="flex items-center gap-2 sm:gap-4">
              <Link href="/login" passHref>
                <Button variant="outline" className="bg-transparent border-white/50 hover:bg-white/10 text-white">Login</Button>
              </Link>
              <Link href="/register" passHref>
                <Button>
                  Sign Up <ArrowRight className="ml-2 h-4 w-4 hidden sm:block" />
                </Button>
              </Link>
            </nav>
          </div>
        </header>
        
        <main className="flex-grow flex items-center justify-center">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <ScrollAnimationWrapper>
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                  Property Management, Simplified.
                </h2>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper delay={0.2}>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-200">
                PropertyPro provides the tools you need to manage your properties efficiently. From leases to payments, we've got you covered.
              </p>
              </ScrollAnimationWrapper>
              <ScrollAnimationWrapper delay={0.4}>
              <div className="mt-8 flex justify-center gap-4">
                <Link href="/dashboard" passHref>
                  <Button size="lg" variant="secondary">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              </ScrollAnimationWrapper>
            </div>
          </section>
        </main>
      </div>

      <Features />

      <Testimonials />

      <footer className="relative text-white">
        <div className="absolute inset-0 z-[-1]">
            <Image
                src="https://atrean.s3.ap-south-1.amazonaws.com/image-files/67ada587e6dc894b280be886/67ada45ce6dc894b280be885/67ada587e6dc894b280be886/building.svg"
                alt="Footer background"
                fill
                className="object-cover"
                data-ai-hint="building cityscape"
            />
            <div className="absolute inset-0 bg-black/40" />
        </div>

        <section className="py-24">
          <ScrollAnimationWrapper>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold">Lost in the rental jungle?</h2>
              <p className="mt-4 text-4xl md:text-5xl font-bold">We've got you.</p>
            </div>
          </ScrollAnimationWrapper>
        </section>

        <ScrollAnimationWrapper delay={0.2}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white/80 pb-6">
            <p>&copy; {new Date().getFullYear()} PropertyPro. All rights reserved.</p>
          </div>
        </ScrollAnimationWrapper>
      </footer>
    </div>
  );
}
