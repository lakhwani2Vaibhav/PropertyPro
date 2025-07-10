
'use client';

import { useState, useMemo, useEffect } from 'react';
import { swipeableProperties, type SwipeableProperty } from '@/lib/mock-data';
import { ListingCard } from '@/components/listing-card';
import { Button } from '@/components/ui/button';
import { Undo2, Heart, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const SWIPE_OFFSET_THRESHOLD = 80;

const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};


export default function ListingsPage() {
  const [properties, setProperties] = useState<SwipeableProperty[]>(swipeableProperties);
  const [history, setHistory] = useState<number[]>([]);
  const { toast } = useToast();

  const activeIndex = useMemo(() => properties.length - 1, [properties]);
  const currentProperty = useMemo(() => properties[activeIndex], [properties, activeIndex]);

  const handleAction = (action: 'pass' | 'interested' | 'save') => {
    if (activeIndex < 0) return;

    if (action === 'save') {
        const currentProperty = properties[activeIndex];
        const storedInterests = JSON.parse(localStorage.getItem('interestedProperties') || '[]');
        const isAlreadyInterested = storedInterests.some((p: SwipeableProperty) => p.id === currentProperty.id);

        if (!isAlreadyInterested) {
            const updatedInterests = [...storedInterests, currentProperty];
            localStorage.setItem('interestedProperties', JSON.stringify(updatedInterests));
            toast({
                title: "Saved to Interests!",
                description: `"${currentProperty.title}" has been added to your list.`,
            });
        } else {
             toast({
                title: "Already Saved",
                description: `"${currentProperty.title}" is already in your interested list.`,
                variant: 'default'
            });
        }
    }
    
    setHistory(prev => [...prev, properties[activeIndex].id]);
    setProperties(prev => prev.slice(0, -1));
  };
  
  const goBack = () => {
    if (history.length > 0) {
      const lastPropertyId = history[history.length - 1];
      const lastProperty = swipeableProperties.find(p => p.id === lastPropertyId);

      if (lastProperty) {
        setHistory(prev => prev.slice(0, -1));
        // Add the property back to the top of the stack
        setProperties(prev => [...prev, lastProperty]);
      }
    }
  };

  const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const horizontalSwipe = swipePower(offset.x, velocity.x);
    const verticalSwipe = swipePower(offset.y, velocity.y);

    if (horizontalSwipe > SWIPE_CONFIDENCE_THRESHOLD || Math.abs(offset.x) > SWIPE_OFFSET_THRESHOLD) {
      // Horizontal swipe
      if (offset.x > 0) {
        handleAction('interested'); // Swipe right
      } else {
        handleAction('pass'); // Swipe left
      }
    } else if (verticalSwipe > SWIPE_CONFIDENCE_THRESHOLD || offset.y < -SWIPE_OFFSET_THRESHOLD) {
      // Vertical swipe up for save
      if (offset.y < 0) {
        handleAction('save');
      }
    }
  };


  return (
    <div className="flex flex-col h-full items-center justify-center p-4 gap-8">
      <div className="relative w-full max-w-sm h-[65vh] md:h-[70vh] flex items-center justify-center">
        <AnimatePresence>
            {properties.length > 0 ? (
                properties.map((property, index) => {
                    if (index === activeIndex) {
                        return (
                            <motion.div
                                key={property.id}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                onDragEnd={onDragEnd}
                                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1, transition: { duration: 0.3 } }}
                                exit={{
                                    x: (Math.random() - 0.5) * 500, // Random exit direction
                                    opacity: 0,
                                    scale: 0.8,
                                    transition: { duration: 0.4 }
                                }}
                                className="absolute w-full h-full cursor-grab active:cursor-grabbing"
                            >
                                <ListingCard property={property} />
                            </motion.div>
                        );
                    }
                    // Render the card underneath for a stack effect, but don't make it interactive
                    else if (index === activeIndex - 1) {
                         return (
                            <motion.div
                                key={property.id}
                                className="absolute w-full h-full"
                                initial={{ scale: 0.8, y: 40, opacity: 0 }}
                                animate={{ scale: 0.95, y: 20, opacity: 1, transition: { duration: 0.3 } }}
                            >
                                <ListingCard property={property} />
                            </motion.div>
                         )
                    }
                    return null;
                })
            ) : (
                <div className="text-center p-8 border-2 border-dashed rounded-lg">
                    <h2 className="text-2xl font-semibold">All Done!</h2>
                    <p className="text-muted-foreground mt-2">You've seen all the available listings.</p>
                    <Button onClick={goBack} disabled={history.length === 0} className="mt-4">
                        <Undo2 className="mr-2 h-4 w-4"/>
                        Go Back
                    </Button>
                </div>
            )}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button 
            variant="outline" 
            size="icon" 
            className="h-16 w-16 rounded-full border-4 border-gray-300 bg-background shadow-lg hover:bg-destructive/10 text-destructive"
            onClick={() => handleAction('pass')}
            disabled={!currentProperty}
        >
          <X className="h-8 w-8" />
        </Button>
        <Button 
            variant="outline" 
            size="icon" 
            className="h-20 w-20 rounded-full border-4 border-blue-400 bg-background shadow-lg hover:bg-blue-500/10 text-blue-500"
            onClick={() => handleAction('save')}
            disabled={!currentProperty}
        >
          <Heart className="h-10 w-10" />
        </Button>
        <Button 
            variant="outline" 
            size="icon" 
            className="h-16 w-16 rounded-full border-4 border-primary/50 bg-background shadow-lg hover:bg-primary/10 text-primary"
            onClick={() => handleAction('interested')}
            disabled={!currentProperty}
        >
          <Check className="h-8 w-8" />
        </Button>
      </div>
       <Button onClick={goBack} variant="ghost" disabled={history.length === 0}>
            <Undo2 className="mr-2 h-4 w-4"/>
            Undo Last Swipe
        </Button>
    </div>
  );
}
