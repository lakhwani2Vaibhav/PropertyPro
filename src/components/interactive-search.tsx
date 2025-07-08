
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Home, IndianRupee, BedDouble, CalendarDays, Clock, Users } from 'lucide-react';
import { ScrollAnimationWrapper } from './scroll-animation-wrapper';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import type { MotionProps } from 'framer-motion';

interface InfoCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const InfoCard = ({ children, className, delay = 0, ...props }: InfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.5 }}
    whileHover={{ scale: 1.05, boxShadow: "0px 10px_20px_rgba(0,0,0,0.1)" }}
    className={cn("absolute bg-card p-3 rounded-2xl shadow-lg border backdrop-blur-sm bg-opacity-80", className)}
    {...props}
  >
    {children}
  </motion.div>
);

export function InteractiveSearch() {
  return (
    <section className="py-16 sm:py-24 bg-orange-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Search, reimagined.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Finding your perfect place is now more intuitive than ever.
            </p>
          </div>
        </ScrollAnimationWrapper>
        
        <div className="relative mx-auto max-w-sm md:max-w-5xl aspect-[9/16] md:aspect-video">
          {/* Base Image */}
          <motion.div 
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* Mobile Image */}
            <Image
              src="https://storage.googleapis.com/mansio-landing-page/landing_mobile.png"
              alt="Interactive property search on mobile"
              fill
              className="block md:hidden object-contain"
              data-ai-hint="man searching apartment"
            />
            {/* Desktop Image */}
            <Image
              src="https://storage.googleapis.com/mansio-landing-page/landing_desktop.png"
              alt="Interactive property search on desktop"
              fill
              className="hidden md:block object-cover rounded-2xl"
              data-ai-hint="man using laptop"
            />
          </motion.div>

          {/* Floating UI Elements */}
          <InfoCard className="top-[8%] left-[5%] md:left-[10%] !p-2 !bg-slate-900 !text-white !dark:bg-slate-800" delay={0.4}>
            <div className="flex items-center gap-2">
              <Sparkles className="text-purple-400 h-5 w-5"/>
              <span className="font-semibold text-sm">Reimagine with AI</span>
            </div>
          </InfoCard>

          <InfoCard className="top-[20%] left-4 md:top-[28%] md:left-8" delay={0.5}>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Home className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-card-foreground/80">Accommodation</p>
                <p className="font-bold text-base">3 BHK</p>
              </div>
            </div>
          </InfoCard>

          <InfoCard className="bottom-[8%] left-[5%] md:left-[10%]" delay={0.6}>
            <div className="flex items-center gap-2 mb-2">
                <p className="font-bold text-sm">Rent</p>
                <div className="ml-auto bg-primary/10 p-1.5 rounded-full">
                    <IndianRupee className="h-4 w-4 text-primary" />
                </div>
            </div>
            <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-4">
                    <span className="text-card-foreground/80">Rent</span>
                    <span className="font-semibold">25K</span>
                </div>
                  <div className="flex justify-between">
                    <span className="text-card-foreground/80">Security Deposit</span>
                    <span className="font-semibold">50K</span>
                </div>
                  <div className="flex justify-between">
                    <span className="text-card-foreground/80">Others</span>
                    <span className="font-semibold">2.5K</span>
                </div>
            </div>
          </InfoCard>

          <InfoCard className="top-[8%] right-4 md:top-[10%] md:right-[12%]" delay={0.7}>
              <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-card-foreground/80">Looking for?</p>
                <p className="font-bold text-base">Flatmate</p>
              </div>
            </div>
          </InfoCard>

            <InfoCard className="top-[25%] right-4 md:top-[28%] md:right-8 w-64 sm:w-auto" delay={0.8}>
              <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-sm">What's more important?</p>
                  <Clock className="h-4 w-4 text-card-foreground/80" />
              </div>
              <div className="flex gap-1 mb-4">
                  <div className="w-1/2 h-1.5 bg-primary rounded-full" />
                  <div className="w-1/3 h-1.5 bg-primary/50 rounded-full" />
                  <div className="w-auto flex-grow h-1.5 bg-muted rounded-full" />
              </div>
              <div className="space-y-2">
                  <Button variant="secondary" className="w-full justify-start h-auto py-2">
                      <div className="text-left">
                          <p className="font-semibold text-sm">Vibe</p>
                          <p className="text-xs text-secondary-foreground/80 font-normal">sunlight, plants, aesthetics</p>
                      </div>
                  </Button>
                    <Button variant="secondary" className="w-full justify-start h-auto py-2">
                      <div className="text-left">
                          <p className="font-semibold text-sm">Function</p>
                          <p className="text-xs text-secondary-foreground/80 font-normal">good Wi-Fi, power backup</p>
                      </div>
                  </Button>
              </div>
          </InfoCard>
          
          <InfoCard className="bottom-[22%] right-[15%] md:bottom-[30%] md:right-[15%]" delay={0.9}>
            <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <BedDouble className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-card-foreground/80">Room Type</p>
                  <p className="font-bold text-sm">Private</p>
                </div>
            </div>
          </InfoCard>
          
          <InfoCard className="bottom-[8%] right-4 md:right-[10%]" delay={1.0}>
            <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                  <div>
                  <p className="text-xs text-card-foreground/80">Availability</p>
                  <p className="font-bold text-sm">24 Feb</p>
                </div>
            </div>
          </InfoCard>

        </div>
      </div>
    </section>
  );
}
