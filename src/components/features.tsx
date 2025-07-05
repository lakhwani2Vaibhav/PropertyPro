
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
  ChevronLeft,
  ChevronRight,
  Dog,
  Dumbbell,
  IndianRupee,
  Info,
  Leaf,
  MapPin,
  Microwave,
  Refrigerator,
  ThumbsDown,
  ThumbsUp,
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

const AmenityItem = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="inline-flex items-center gap-2 rounded-md bg-orange-50 px-2 py-1 text-sm text-orange-900">
    {icon}
    <span>{children}</span>
  </div>
);

export function Features() {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            You&apos;ve swiped enough for <span className="text-primary">love</span>.
            Now, let&apos;s swipe for <span className="text-primary">rent</span>.
          </h2>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button size="lg">Flats</Button>
          <Button size="lg" variant="outline">
            Flatmates
          </Button>
        </div>

        <div className="relative mt-12">
          {/* Background cards for stacked effect */}
          <div className="absolute inset-x-0 top-0 mx-auto h-full w-[95%] rounded-3xl bg-gray-200 transform -rotate-2" />
          <div className="absolute inset-x-0 top-0 mx-auto h-full w-[98%] rounded-3xl bg-gray-300/70 transform -rotate-1" />

          {/* Main Card */}
          <div className="relative mx-auto max-w-6xl rounded-3xl bg-card p-4 shadow-2xl sm:p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column */}
              <div className="space-y-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {[1, 2, 3, 4].map((_, index) => (
                      <CarouselItem key={index}>
                        <Image
                          src="https://storage.googleapis.com/mansio-landing-page/Property%20Card%201/room%20photo_card%201.png"
                          alt="Bathroom"
                          width={600}
                          height={400}
                          className="aspect-[4/3] w-full rounded-2xl object-cover"
                          data-ai-hint="bathroom interior"
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
                      src="https://storage.googleapis.com/mansio-landing-page/Property%20Card%201/drawing%20room_card%201.png"
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
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="woman face"/>
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <Avatar className="-ml-3 h-10 w-10 border-2 border-background">
                        <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="man face"/>
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
        </div>

        {/* Action Buttons */}
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
      </div>
    </section>
  );
}
