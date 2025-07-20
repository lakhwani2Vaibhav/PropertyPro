
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const roomAmenities = [
  'Cot', 'Mattress', 'Wardrobe', 'Working desk', 'Air Conditioner', 'Dedicated Bathroom'
];

const flatAmenities = [
  'Washing Machine', 'Microwave', 'Refrigerator', 'Wi-Fi', 'TV', 'Sofa'
];

const societyAmenities = [
  'Covered Parking', 'Clubhouse', 'Gym', 'Lift', 'Swimming Pool', 'Security'
];

interface SelectAmenitiesProps {
  onContinue: () => void;
  onBack: () => void;
}

export function SelectAmenities({ onContinue, onBack }: SelectAmenitiesProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenityName: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityName)
        ? prev.filter((a) => a !== amenityName)
        : [...prev, amenityName]
    );
  };
  
  const renderAmenityButtons = (amenities: string[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {amenities.map((amenity) => (
        <button
          key={amenity}
          className={cn(
            'p-3 border rounded-lg transition-all text-center font-medium',
            selectedAmenities.includes(amenity)
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border hover:border-foreground/50'
          )}
          onClick={() => toggleAmenity(amenity)}
        >
          {amenity}
        </button>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <Progress value={80} className="w-full mb-4" />
        <CardTitle>Tell tenants what your place has to offer</CardTitle>
        <CardDescription>You can add more amenities after you publish.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <Tabs defaultValue="room" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="room">Room</TabsTrigger>
            <TabsTrigger value="flat">Flat</TabsTrigger>
            <TabsTrigger value="society">Society</TabsTrigger>
          </TabsList>
          <TabsContent value="room" className="mt-6">
            {renderAmenityButtons(roomAmenities)}
          </TabsContent>
          <TabsContent value="flat" className="mt-6">
            {renderAmenityButtons(flatAmenities)}
          </TabsContent>
          <TabsContent value="society" className="mt-6">
            {renderAmenityButtons(societyAmenities)}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between items-center pt-4">
          <Button variant="ghost" onClick={onBack}>Back</Button>
          <Button onClick={onContinue}>Continue</Button>
        </div>
      </CardContent>
    </Card>
  );
}
