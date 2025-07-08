
'use client';

import Image from 'next/image';
import { motion, type MotionProps } from 'framer-motion';
import { Sparkles, Home, IndianRupee, BedDouble, CalendarDays, Clock, Users } from 'lucide-react';
import { ScrollAnimationWrapper } from './scroll-animation-wrapper';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface InfoCardProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  delay?: number;
}

const InfoCard = ({ children, className, contentClassName, delay = 0, ...props }: InfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    viewport={{ once: true, amount: 0.3 }}
    className={cn("absolute", className)}
    {...props}
  >
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay + Math.random(),
      }}
      whileHover={{ y: 0, scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      className={cn(
        "bg-slate-900/80 text-white p-3 rounded-2xl shadow-lg border border-slate-700",
        contentClassName
      )}
    >
      {children}
    </motion.div>
  </motion.div>
);


export function InteractiveSearch() {
  return (
    <section className="py-16 sm:py-24 bg-orange-50 dark:bg-slate-900 overflow-x-clip">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Search, reimagined.</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
              Finding your perfect place is now more intuitive than ever.
            </p>
          </div>
        </ScrollAnimationWrapper>
        
        {/* Main container for the interactive element */}
        <div className="relative mx-auto max-w-sm md:max-w-5xl aspect-[9/16] md:aspect-auto md:h-96">
            {/* The colored shadow and frame container */}
            <motion.div
                className="w-full h-full relative md:shadow-[-8px_-9px_80px_40px_#ef7a4c40] rounded-[2rem] md:rounded-[3.9rem]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Padding div to create the inner border effect */}
                <div className="h-full w-full p-1.5 md:p-2.5">
                    {/* Mobile Image */}
                    <Image
                    src="https://storage.googleapis.com/mansio-landing-page/landing_mobile.png"
                    alt="Interactive property search on mobile"
                    fill
                    className="block md:hidden object-cover rounded-[1.8rem]"
                    data-ai-hint="man searching apartment"
                    />
                    {/* Desktop Image */}
                    <Image
                    src="https://storage.googleapis.com/mansio-landing-page/landing_desktop.png"
                    alt="Interactive property search on desktop"
                    fill
                    className="hidden md:block object-cover rounded-[3.39rem]"
                    data-ai-hint="man using laptop"
                    />
                </div>

                {/* Floating UI Elements */}

                 {/* Map Pin Image - Mobile only */}
                 <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="absolute bottom-[30%] -left-12 h-48 w-48 md:hidden"
                >
                    <motion.div
                        animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    >
                        <Image src="https://demo.mansio.ai/assets/location-BCXULW7-.svg" alt="Map Pin" layout="fill" className="object-contain" />
                    </motion.div>
                </motion.div>

                {/* Top-left card */}
                <InfoCard className="top-12 -left-4 md:top-8 md:-left-8" contentClassName="!p-2" delay={0.4}>
                    <div className="flex items-center gap-2">
                        <Sparkles className="text-purple-400 h-5 w-5"/>
                        <span className="font-semibold text-sm">Reimagine with AI</span>
                    </div>
                </InfoCard>

                {/* Left card */}
                <InfoCard className="top-40 -left-6 md:top-1/3 md:-left-16" delay={0.5}>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <Home className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-white/80">Accommodation</p>
                            <p className="font-bold text-base">3 BHK</p>
                        </div>
                    </div>
                </InfoCard>

                {/* Bottom-left card */}
                <InfoCard className="bottom-12 -left-4 md:bottom-2 md:-left-10 z-10" delay={0.6} contentClassName="p-4">
                     <div className="flex items-center gap-2 mb-2">
                        <p className="font-bold text-lg">Rent</p>
                        <div className="ml-auto bg-primary/20 p-2 rounded-full">
                            <IndianRupee className="h-4 w-4 text-primary" />
                        </div>
                    </div>
                    <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between gap-6">
                            <span className="text-white/80">Rent</span>
                            <span className="font-semibold">25K</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/80">Security Deposit</span>
                            <span className="font-semibold">50K</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-white/80">Others</span>
                            <span className="font-semibold">2.5K</span>
                        </div>
                    </div>
                </InfoCard>

                {/* Top-Center card */}
                 <InfoCard className="top-4 left-1/4 md:left-1/2 md:-translate-x-1/2 w-56 md:-top-5" delay={0.7}>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-white/80">What're you looking for?</p>
                            <p className="font-bold text-base">Looking for flatmate</p>
                        </div>
                    </div>
                </InfoCard>
                
                {/* Top-right card */}
                <InfoCard className="top-24 -right-8 w-60 md:top-1/4 md:-right-24 md:w-64" delay={0.8}>
                    <div className="flex justify-between items-center mb-3">
                        <p className="font-semibold text-sm">What's more important?</p>
                        <Clock className="h-4 w-4 text-white/80" />
                    </div>
                    <div className="flex gap-1 mb-4">
                        <div className="w-1/2 h-1.5 bg-primary rounded-full" />
                        <div className="w-1/3 h-1.5 bg-primary/50 rounded-full" />
                        <div className="w-auto flex-grow h-1.5 bg-muted rounded-full" />
                    </div>
                    <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start h-auto py-2 bg-white/5 hover:bg-white/10 text-white border-white/10">
                            <div className="text-left">
                                <p className="font-semibold text-sm">Vibe</p>
                                <p className="text-xs text-white/80 font-normal">sunlight, plants, aesthetics</p>
                            </div>
                        </Button>
                        <Button variant="outline" className="w-full justify-start h-auto py-2 bg-white/5 hover:bg-white/10 text-white border-white/10">
                            <div className="text-left">
                                <p className="font-semibold text-sm">Function</p>
                                <p className="text-xs text-white/80 font-normal">good Wi-Fi, power backup</p>
                            </div>
                        </Button>
                    </div>
                </InfoCard>
                
                {/* Bottom-right card */}
                <InfoCard className="bottom-24 -right-2 md:bottom-[15%] md:-right-12" delay={0.9}>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <BedDouble className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-white/80">Room Type</p>
                            <p className="font-bold text-sm">Private</p>
                        </div>
                    </div>
                </InfoCard>
                
                {/* Bottom-far-right card */}
                <InfoCard className="bottom-12 -right-4 md:bottom-4 md:-right-4" delay={1.0}>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <CalendarDays className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-white/80">Availability</p>
                            <p className="font-bold text-sm">24 Feb</p>
                        </div>
                    </div>
                </InfoCard>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
