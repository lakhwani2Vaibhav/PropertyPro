
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

interface AddLocationFormProps {
  onContinue: () => void;
}

export function AddLocationForm({ onContinue }: AddLocationFormProps) {
  const handleContinue = () => {
    // In a real app, you would save the location and then navigate.
    onContinue(); 
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <Progress value={20} className="w-full mb-4" />
        <CardTitle>Confirm your address</CardTitle>
        <CardDescription>Your address is only shared with tenants after you have confirmed a booking.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Location" className="pl-9" defaultValue="Bangalore, India" />
        </div>
        <div>
          <Image
            src="https://storage.googleapis.com/mansio-landing-page/location-map.png"
            alt="Map of Bengaluru"
            width={500}
            height={200}
            className="rounded-lg object-cover w-full h-48"
            data-ai-hint="city map"
          />
        </div>
        <Button onClick={handleContinue} className="w-full" size="lg">
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
