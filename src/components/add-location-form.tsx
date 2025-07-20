
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function AddLocationForm() {
  const router = useRouter();

  const handleContinue = () => {
    // In a real app, you would save the location and then navigate.
    // For now, we'll navigate to the listings page as a placeholder for the next step.
    router.push('/dashboard/listings'); 
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add Location</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search Location" className="pl-9" />
        </div>
        <div>
          <Image
            src="https://storage.googleapis.com/mansio-landing-page/location-map.png"
            alt="Map of Bengaluru"
            width={500}
            height={200}
            className="rounded-lg object-cover w-full"
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
