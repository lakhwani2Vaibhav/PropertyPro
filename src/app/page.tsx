

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout } from "lucide-react";
import Link from 'next/link';
import Image from "next/image";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { VoiceAssistant } from "@/components/voice-assistant";
import { InteractiveSearch } from "@/components/interactive-search";
import { Faq } from "@/components/faq";
import { AddLocationForm } from '@/components/add-listing/add-location-form';
import { SelectPropertyType } from '@/components/add-listing/select-property-type';
import { SelectRoomType } from '@/components/add-listing/select-room-type';
import { SelectAmenities } from '@/components/add-listing/select-amenities';
import { AddPhotos } from '@/components/add-listing/add-photos';
import ListingsPage from '@/app/dashboard/listings/page';
import { LookingForDialog } from '@/components/looking-for-dialog';
import { SelectListingType } from '@/components/add-listing/select-listing-type';

type ListerFlowStep = 'add-listing-type' | 'add-listing-location' | 'add-listing-property-type' | 'add-listing-room-type' | 'add-listing-amenities' | 'add-listing-photos';
type SeekerFlowStep = 'find-listing-location' | 'find-listing-property-type' | 'find-listing-room-type' | 'find-listing-amenities' | 'view-listings';
type FlowStep = 'initial' | ListerFlowStep | SeekerFlowStep;


export default function Home() {
  const [isLookingForDialogOpen, setIsLookingForDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowStep>('initial');

  const resetFlow = () => setCurrentStep('initial');

  const renderCurrentStep = () => {
    switch (currentStep) {
      // Lister Flow (Add a property)
      case 'add-listing-type':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><SelectListingType onContinue={() => setCurrentStep('add-listing-location')} /></div>;
      case 'add-listing-location':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><AddLocationForm onContinue={() => setCurrentStep('add-listing-property-type')} onBack={() => setCurrentStep('add-listing-type')} /></div>;
      case 'add-listing-property-type':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><SelectPropertyType onContinue={() => setCurrentStep('add-listing-room-type')} onBack={() => setCurrentStep('add-listing-location')} /></div>;
      case 'add-listing-room-type':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><SelectRoomType onContinue={() => setCurrentStep('add-listing-amenities')} onBack={() => setCurrentStep('add-listing-property-type')} /></div>;
      case 'add-listing-amenities':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><SelectAmenities onContinue={() => setCurrentStep('add-listing-photos')} onBack={() => setCurrentStep('add-listing-room-type')} /></div>;
      case 'add-listing-photos':
        // The "Finish" button should eventually prompt login/signup to save the listing.
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><AddPhotos onFinish={resetFlow} onBack={() => setCurrentStep('add-listing-amenities')} /></div>;
      
      // Seeker Flow (Find a property)
      case 'find-listing-location':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><AddLocationForm onContinue={() => setCurrentStep('find-listing-property-type')} onBack={resetFlow} /></div>;
      case 'find-listing-property-type':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><SelectPropertyType onContinue={() => setCurrentStep('find-listing-room-type')} onBack={() => setCurrentStep('find-listing-location')} /></div>;
      case 'find-listing-room-type':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><SelectRoomType onContinue={() => setCurrentStep('find-listing-amenities')} onBack={() => setCurrentStep('find-listing-property-type')} /></div>;
      case 'find-listing-amenities':
        return <div className="bg-muted py-20 flex items-center justify-center min-h-screen"><SelectAmenities onContinue={() => setCurrentStep('view-listings')} onBack={() => setCurrentStep('find-listing-room-type')} /></div>;
      case 'view-listings':
        return <div className="bg-muted"><ListingsPage /></div>;

      case 'initial':
      default:
        return (
          <>
            <div className="relative flex min-h-screen flex-col text-white">
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
                  <Link href="/" className="flex items-center gap-2">
                    <div className="h-7 w-7 bg-primary rounded-md flex items-center justify-center">
                        <Sprout className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold">PropertyPro</h1>
                  </Link>
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
                      <Button size="lg" variant="secondary" asChild>
                        <Link href="/dashboard">
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                    </ScrollAnimationWrapper>
                  </div>
                </section>
              </main>
            </div>

            <section className="bg-orange-50 py-16 sm:py-24">
              <ScrollAnimationWrapper>
                  <VoiceAssistant onNotTalkerClick={() => setIsLookingForDialogOpen(true)} />
              </ScrollAnimationWrapper>
            </section>

            <InteractiveSearch />
            <Features />
            <Testimonials />
            <Faq />

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
          </>
        );
    }
  }

  return (
    <div className="theme-landing">
      {renderCurrentStep()}
      <LookingForDialog 
        open={isLookingForDialogOpen} 
        onOpenChange={setIsLookingForDialogOpen}
        onContinue={(selection) => {
          if (selection === 'flat') {
            // Start the Seeker Flow
            setCurrentStep('find-listing-location');
          } else if (selection === 'flatmates') {
            // Start the Lister Flow
            setCurrentStep('add-listing-type');
          }
        }}
      />
    </div>
  );
}
