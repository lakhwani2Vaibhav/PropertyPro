
'use client';

import { useState, useMemo, useEffect } from 'react';
import { swipeableProperties, type SwipeableProperty } from '@/lib/mock-data';
import { ListingCard } from '@/components/listing-card';
import { Button } from '@/components/ui/button';
import { Undo2, Heart, X, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';

export default function ListingsPage() {
  const [properties, setProperties] = useState<SwipeableProperty[]>(swipeableProperties);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const { toast } = useToast();

  const handleAction = (action: 'pass' | 'interested' | 'save') => {
    if (currentIndex >= properties.length) return;

    if (action === 'save') {
        const currentProperty = properties[currentIndex];
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

    setHistory(prev => [...prev, currentIndex]);
    setCurrentIndex(prev => prev + 1);
  };
  
  const goBack = () => {
    if (history.length > 0) {
      const lastIndex = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentIndex(lastIndex);
    }
  };

  const currentProperty = useMemo(() => {
    return properties.length > 0 && currentIndex < properties.length ? properties[currentIndex] : null;
  }, [properties, currentIndex]);

  return (
    <div className="flex flex-col h-full items-center justify-center p-4 gap-8">
      <div className="relative w-full max-w-sm h-[70vh] flex items-center justify-center">
        <AnimatePresence>
            {currentProperty ? (
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="absolute w-full h-full"
                >
                    <ListingCard property={currentProperty} />
                </motion.div>
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
