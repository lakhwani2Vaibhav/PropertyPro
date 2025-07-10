'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type SwipeableProperty } from '@/lib/mock-data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { IndianRupee, Trash2, BedDouble, Bath, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function InterestsPage() {
  const [interestedProperties, setInterestedProperties] = useState<SwipeableProperty[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [propertyToRemove, setPropertyToRemove] = useState<SwipeableProperty | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    const storedInterests = localStorage.getItem('interestedProperties');
    if (storedInterests) {
      setInterestedProperties(JSON.parse(storedInterests));
    }
  }, []);

  const handleRemove = (propertyId: number) => {
    const updatedProperties = interestedProperties.filter(p => p.id !== propertyId);
    setInterestedProperties(updatedProperties);
    localStorage.setItem('interestedProperties', JSON.stringify(updatedProperties));
    setPropertyToRemove(null);
    toast({
        title: "Removed from Interests",
        description: "The property has been removed from your list.",
    });
  };

  const openConfirmationDialog = (property: SwipeableProperty) => {
    setPropertyToRemove(property);
  };

  if (!isClient) {
    return null; // or a loading skeleton
  }

  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-3xl font-bold">Your Interested Properties</h1>
        <p className="text-muted-foreground">Here are the listings you've saved. Review them here.</p>
      </div>

      {interestedProperties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {interestedProperties.map((prop) => (
            <Card key={prop.id} className="overflow-hidden flex flex-col group transition-all hover:shadow-xl">
              <div className="relative">
                <Image 
                    src={prop.images[0]} 
                    alt={prop.title} 
                    width={600} 
                    height={400} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    data-ai-hint="apartment interior" 
                />
                 <Badge className="absolute top-3 right-3 capitalize" variant={prop.availability === 'available' ? 'default' : 'secondary'}>{prop.availability}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg leading-tight">{prop.title}</CardTitle>
                <p className="text-sm text-muted-foreground -mt-1">{prop.location}</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                 <div className="flex justify-between items-center text-lg font-bold text-primary">
                    <span className="flex items-center"><IndianRupee className="h-5 w-5 mr-1" />{prop.rent.toLocaleString()} / mo</span>
                 </div>
                 <div className="grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground border-t pt-3">
                    <div>
                        <BedDouble className="h-5 w-5 mx-auto mb-1" />
                        <span>{prop.bedrooms} Beds</span>
                    </div>
                    <div>
                        <Bath className="h-5 w-5 mx-auto mb-1" />
                        <span>{prop.bathrooms} Baths</span>
                    </div>
                    <div>
                        <Square className="h-5 w-5 mx-auto mb-1" />
                        <span>{prop.sqft} sqft</span>
                    </div>
                </div>
              </CardContent>
               <div className="p-4 pt-0">
                  <Button variant="destructive" className="w-full" onClick={() => openConfirmationDialog(prop)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">No Interested Properties Yet</h2>
          <p className="text-muted-foreground mt-2">
            Go to the <a href="/dashboard/listings" className="text-primary underline">Listings</a> page and swipe up on properties to save them here.
          </p>
        </div>
      )}

      <AlertDialog open={!!propertyToRemove} onOpenChange={(open) => !open && setPropertyToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove "{propertyToRemove?.title}" from your interested list. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPropertyToRemove(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => propertyToRemove && handleRemove(propertyToRemove.id)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Yes, remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
