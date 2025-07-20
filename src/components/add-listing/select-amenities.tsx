
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { AirVent, Car, Dumbbell, ParkingSquare, Refrigerator, Tv, WashingMachine, Wifi } from 'lucide-react';

const amenities = [
  { name: 'Wi-Fi', icon: <Wifi /> },
  { name: 'TV', icon: <Tv /> },
  { name: 'Refrigerator', icon: <Refrigerator /> },
  { name: 'Washing Machine', icon: <WashingMachine /> },
  { name: 'Air Conditioner', icon: <AirVent /> },
  { name: 'Gym', icon: <Dumbbell /> },
  { name: 'Parking', icon: <Car /> },
];

export function SelectAmenities() {
  const router = useRouter();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenityName: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityName)
        ? prev.filter((a) => a !== amenityName)
        : [...prev, amenityName]
    );
  };

  const handleContinue = () => {
    router.push('/dashboard/add-listing/photos');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <Progress value={80} className="w-full mb-4" />
        <CardTitle>Tell tenants what your place has to offer</CardTitle>
        <CardDescription>You can add more amenities after you publish.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <button
              key={amenity.name}
              className={cn(
                'p-4 border-2 rounded-lg flex flex-col items-start gap-2 transition-all h-28',
                selectedAmenities.includes(amenity.name)
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => toggleAmenity(amenity.name)}
            >
              <div className="h-8 w-8">{amenity.icon}</div>
              <span className="font-semibold">{amenity.name}</span>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4">
          <Button variant="ghost" onClick={() => router.back()}>Back</Button>
          <Button onClick={handleContinue}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
}
