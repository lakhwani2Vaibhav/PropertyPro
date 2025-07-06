
'use client';

import Image from 'next/image';
import {
  AirVent,
  ArrowUp,
  Ban,
  Bed,
  Briefcase,
  Building2,
  Car,
  CigaretteOff,
  Dog,
  Dumbbell,
  Facebook,
  IndianRupee,
  Info,
  Instagram,
  Leaf,
  Linkedin,
  MapPin,
  Microwave,
  Refrigerator,
  ThumbsDown,
  ThumbsUp,
  Twitter,
  WashingMachine,
  Wifi,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScrollAnimationWrapper } from './scroll-animation-wrapper';

// Helper Components
const AmenityItem = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="inline-flex items-center gap-2 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground">
    {icon}
    <span>{children}</span>
  </div>
);

const InterestBadge = ({ emoji, children }: { emoji: string; children: React.ReactNode }) => (
    <div className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent/50 px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent">
      <span>{emoji}</span>
      <span>{children}</span>
    </div>
);

// Data for Flat Card
const carouselImages = [
  {
    src: 'https://storage.googleapis.com/mansio-landing-page/Property%20Card%201/room%20photo_card%201.png',
    alt: 'Bedroom',
    hint: 'bedroom interior',
  },
  {
    src: 'https://storage.googleapis.com/mansio-landing-page/Property%20Card%201/drawing%20room_card%201.png',
    alt: 'Living Room',
    hint: 'living room',
  },
  {
    src: 'https://storage.googleapis.com/mansio-landing-page/Property%20Card%201/Kitchen_card1.png',
    alt: 'Kitchen',
    hint: 'modern kitchen',
  },
  {
    src: 'https://storage.googleapis.com/mansio-landing-page/Property%20Card%201/Card1_washroom.png',
    alt: 'Bathroom',
    hint: 'clean bathroom',
  },
];


// Card Components
const FlatCard = () => (
    <div className="relative mx-auto max-w-6xl rounded-3xl bg-card p-4 shadow-2xl sm:p-6">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Left Column */}
      <div className="space-y-4">
        <Carousel className="w-full">
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                  data-ai-hint={image.hint}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Rent</p>
            <p className="flex items-center justify-center text-xl font-bold">
              <IndianRupee className="h-5 w-5" />
              16K
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Security Deposit</p>
            <p className="flex items-center justify-center text-xl font-bold">
              <IndianRupee className="h-5 w-5" />
              50K
            </p>
          </div>
          <div className="text-center">
            <p className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              Extra <Info className="h-3 w-3" />
            </p>
            <p className="flex items-center justify-center text-xl font-bold">
              <IndianRupee className="h-5 w-5" />
              2K
            </p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src="https://demo.mansio.ai/assets/location-BCXULW7-.svg"
              alt="Map"
              width={100}
              height={100}
              className="h-full w-full rounded-lg object-cover"
              data-ai-hint="map location"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
              <MapPin className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold">A room in a 2BHK</h3>
            <p className="text-muted-foreground">
              Salarpuria Serenity, HSR Layout, Sector 2, Bangalore 560102
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-secondary p-3 text-center">
            <p className="text-xs text-muted-foreground">Accom. Type</p>
            <p className="font-semibold">2BHK</p>
          </div>
          <div className="rounded-lg bg-secondary p-3 text-center">
            <p className="text-xs text-muted-foreground">Room Type</p>
            <p className="font-semibold">Private</p>
          </div>
          <div className="rounded-lg bg-secondary p-3 text-center">
            <p className="text-xs text-muted-foreground">Availability</p>
            <p className="font-semibold">08-Jul</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-3 pt-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Room Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              <AmenityItem icon={<Bed className="h-4 w-4" />}>
                Mattress
              </AmenityItem>
              <AmenityItem icon={<Briefcase className="h-4 w-4" />}>
                Working desk
              </AmenityItem>
              <AmenityItem icon={<AirVent className="h-4 w-4" />}>
                Air Conditioner
              </AmenityItem>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Flat Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              <AmenityItem icon={<WashingMachine className="h-4 w-4" />}>
                Washing Machine
              </AmenityItem>
              <AmenityItem icon={<Microwave className="h-4 w-4" />}>
                Microwave
              </AmenityItem>
              <AmenityItem icon={<Refrigerator className="h-4 w-4" />}>
                Refrigerator
              </AmenityItem>
              <AmenityItem icon={<Wifi className="h-4 w-4" />}>
                Wi-Fi
              </AmenityItem>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Society Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              <AmenityItem icon={<Car className="h-4 w-4" />}>
                Covered Parking
              </AmenityItem>
              <AmenityItem icon={<Building2 className="h-4 w-4" />}>
                Clubhouse
              </AmenityItem>
              <AmenityItem icon={<Dumbbell className="h-4 w-4" />}>
                Gym
              </AmenityItem>
              <AmenityItem icon={<ArrowUp className="h-4 w-4" />}>
                Lift
              </AmenityItem>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Desired Flatmate Preference
            </h4>
            <div className="space-y-2">
              <Badge variant="outline">
                <Ban className="mr-1.5 h-3.5 w-3.5" /> Non-smoker
              </Badge>
              <Badge variant="outline">
                <Leaf className="mr-1.5 h-3.5 w-3.5" /> Vegetarian
              </Badge>
              <Badge variant="outline">
                <Dog className="mr-1.5 h-3.5 w-3.5" /> Pets allowed
              </Badge>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
              Flatmates
            </h4>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 border-2 border-background">
                <AvatarImage src="https://demo.mansio.ai/assets/flatmate-1-CjSZ3G94.jpg" data-ai-hint="woman face"/>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="-ml-3 h-10 w-10 border-2 border-background">
                <AvatarImage src="https://demo.mansio.ai/assets/flatmate-2-CGqLaMi5.jpg" data-ai-hint="man face"/>
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
               <Avatar className="-ml-3 h-10 w-10 border-2 border-background">
                 <AvatarFallback className="bg-primary text-primary-foreground">+1</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FlatmateCard = () => (
    <div className="relative mx-auto max-w-lg rounded-3xl bg-card p-4 shadow-2xl sm:p-6">
        <div className="space-y-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <Image
                    src="https://media.licdn.com/dms/image/v2/C4D03AQE2VsHn5ijFYA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1642323212717?e=1756944000&v=beta&t=TQiFglyU0rI_M9XXPHzGvFJ0R6bWjr1m6U0vwPidke8"
                    alt="Shubham"
                    width={150}
                    height={150}
                    className="h-36 w-36 flex-shrink-0 rounded-2xl object-cover"
                    data-ai-hint="man portrait"
                />
                <div className="w-full flex-1 space-y-4 text-center sm:text-left">
                    <h3 className="text-2xl font-bold">Shubham, 22 (M)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">College</p>
                            <p className="font-semibold text-lg">ABES Engineering College</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Work Place</p>
                            <p className="font-semibold text-lg">PropertyPro</p>
                        </div>
                    </div>
                     <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Shubham is</p>
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                            <Badge variant="outline" className="px-3 py-1.5 text-sm"><Leaf className="mr-1.5 h-4 w-4 text-green-600" /> Non-Vegetarian</Badge>
                            <Badge variant="outline" className="px-3 py-1.5 text-sm"><CigaretteOff className="mr-1.5 h-4 w-4 text-red-600" /> Non-smoker</Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className='pt-2'>
                <p className="text-sm font-semibold text-muted-foreground mb-2">Shubham's Interest</p>
                <div className="flex flex-wrap gap-2">
                    <InterestBadge emoji="🌅">Sunrise Starter</InterestBadge>
                    <InterestBadge emoji="😊">Goes-with-flow</InterestBadge>
                    <InterestBadge emoji="😌">Peaceful Pal</InterestBadge>
                    <InterestBadge emoji="⚡️">Practical Player</InterestBadge>
                    <InterestBadge emoji="💬">The Diplomat</InterestBadge>
                </div>
            </div>

            <div className="border-t pt-4 mt-6">
                <div className="flex items-center justify-around">
                    <a href="https://www.linkedin.com/in/shubham-10-singh/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-7 w-7 cursor-pointer text-muted-foreground/60 transition-colors hover:text-primary" />
                    </a>
                    <a href="https://instagram.com/shubh_am_10" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-7 w-7 cursor-pointer text-muted-foreground/60 transition-colors hover:text-primary" />
                    </a>
                    <a href="https://x.com/Shubh_am_10_" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-7 w-7 cursor-pointer text-muted-foreground/60 transition-colors hover:text-primary" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-7 w-7 cursor-pointer text-muted-foreground/60 transition-colors hover:text-primary" />
                    </a>
                </div>
            </div>
        </div>
    </div>
);


// Main Component
export function Features() {
  const [activeView, setActiveView] = useState('flats');

  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              You&apos;ve swiped enough for <span className="text-primary">love</span>.
              Now, let&apos;s swipe for <span className="text-primary">rent</span>.
            </h2>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper delay={0.2}>
          <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-full border bg-muted p-1">
                  <Button 
                      size="lg" 
                      variant={activeView === 'flats' ? 'default' : 'ghost'} 
                      onClick={() => setActiveView('flats')}
                      className="rounded-full w-32"
                  >
                      Flats
                  </Button>
                  <Button 
                      size="lg" 
                      variant={activeView === 'flatmates' ? 'default' : 'ghost'} 
                      onClick={() => setActiveView('flatmates')}
                      className="rounded-full w-32"
                  >
                      Flatmates
                  </Button>
              </div>
          </div>
        </ScrollAnimationWrapper>
        
        <ScrollAnimationWrapper delay={0.4}>
          <div className="relative mt-12">
            {/* Background cards for stacked effect */}
            <div className={cn(
                "absolute inset-x-0 top-0 mx-auto h-full w-[95%] rounded-3xl bg-gray-200 transform -rotate-2",
                activeView === 'flats' ? 'max-w-6xl' : 'max-w-lg'
            )} />
            <div className={cn(
                "absolute inset-x-0 top-0 mx-auto h-full w-[98%] rounded-3xl bg-gray-300/70 transform -rotate-1",
                activeView === 'flats' ? 'max-w-6xl' : 'max-w-lg'
            )} />
            
            {activeView === 'flats' ? <FlatCard /> : <FlatmateCard />}
          </div>
        </ScrollAnimationWrapper>

        {/* Action Buttons */}
        <ScrollAnimationWrapper delay={0.2}>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16 rounded-full border-4 border-gray-300 bg-background shadow-lg hover:bg-destructive/10"
            >
              <ThumbsDown className="h-8 w-8 text-destructive" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-16 w-16 rounded-full border-4 border-primary/50 bg-background shadow-lg hover:bg-primary/10"
            >
              <ThumbsUp className="h-8 w-8 text-primary" />
            </Button>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
