
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { type SwipeableProperty } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, MapPin, Building, BedDouble, Bath, Square, Wifi, Refrigerator, WashingMachine } from 'lucide-react';

interface ListingCardProps {
  property: SwipeableProperty;
}

const AmenityIcon = ({ name }: { name: string }) => {
    switch(name.toLowerCase()) {
        case 'wi-fi': return <Wifi className="h-4 w-4"/>;
        case 'refrigerator': return <Refrigerator className="h-4 w-4"/>;
        case 'washing machine': return <WashingMachine className="h-4 w-4"/>;
        default: return null;
    }
}

export function ListingCard({ property }: ListingCardProps) {
  return (
    <Card className="w-full h-full rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <div className="relative flex-shrink-0">
        <Carousel 
          className="w-full"
          opts={{
            watchDrag: false, // Keep this disabled to let the parent handle swipes
          }}
        >
          <CarouselContent>
            {property.images.map((img, index) => (
              <CarouselItem key={index}>
                <Image
                  src={img}
                  alt={`${property.title} image ${index + 1}`}
                  width={400}
                  height={300}
                  className="w-full h-64 md:h-56 object-cover pointer-events-none"
                  data-ai-hint="apartment interior"
                  draggable={false}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* This overlay captures swipe gestures over the image area */}
          <div className="absolute inset-0 z-10" />
          <CarouselPrevious className="left-4 z-20" />
          <CarouselNext className="right-4 z-20" />
        </Carousel>
        <Badge className="absolute bottom-3 left-3 capitalize z-20" variant={property.availability === 'available' ? 'default' : 'secondary'}>
          {property.availability}
        </Badge>
      </div>

      <CardContent className="p-4 flex-grow overflow-y-auto space-y-4">
        <div>
          <h2 className="text-xl font-bold leading-tight">{property.title}</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
            <MapPin className="h-4 w-4" /> {property.location}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center border-t border-b py-3">
             <div>
                <p className="text-sm text-muted-foreground">Rent</p>
                <p className="font-bold text-lg flex items-center justify-center text-primary">
                    <IndianRupee className="h-4 w-4"/>{property.rent.toLocaleString()}
                </p>
            </div>
             <div>
                <p className="text-sm text-muted-foreground">Deposit</p>
                <p className="font-bold text-lg flex items-center justify-center">
                   <IndianRupee className="h-4 w-4"/>{property.deposit.toLocaleString()}
                </p>
            </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
            <div>
                <BedDouble className="h-5 w-5 mx-auto mb-1" />
                <span>{property.bedrooms} Beds</span>
            </div>
            <div>
                <Bath className="h-5 w-5 mx-auto mb-1" />
                <span>{property.bathrooms} Baths</span>
            </div>
            <div>
                <Square className="h-5 w-5 mx-auto mb-1" />
                <span>{property.sqft} sqft</span>
            </div>
        </div>

        <div>
            <h4 className="font-semibold text-sm mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-2">
                {property.amenities.map(amenity => (
                    <Badge key={amenity} variant="outline" className="flex items-center gap-1.5">
                        <AmenityIcon name={amenity} />
                        {amenity}
                    </Badge>
                ))}
            </div>
        </div>

      </CardContent>
    </Card>
  );
}
