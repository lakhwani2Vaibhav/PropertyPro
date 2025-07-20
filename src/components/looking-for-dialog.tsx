
'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LookingForDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LookingForDialog({ open, onOpenChange }: LookingForDialogProps) {
  const [selection, setSelection] = useState<'flat' | 'flatmates' | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (selection === 'flat') {
      router.push('/login?redirect=/dashboard/listings');
    } else if (selection === 'flatmates') {
      router.push('/login?redirect=/dashboard/properties');
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            What are you looking for?
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 py-6">
          <div
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 p-6 transition-all duration-200',
              selection === 'flat'
                ? 'border-primary shadow-lg scale-105'
                : 'border-border hover:border-primary/50 hover:shadow-md'
            )}
            onClick={() => setSelection('flat')}
          >
            <Image
              src="https://storage.googleapis.com/mansio-landing-page/flat.png"
              alt="Flat"
              width={120}
              height={120}
              className="h-28 w-28 object-contain"
              data-ai-hint="house illustration"
            />
            <span className="text-lg font-semibold">Room/Flat</span>
          </div>
          <div
            className={cn(
              'flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 p-6 transition-all duration-200',
              selection === 'flatmates'
                ? 'border-primary shadow-lg scale-105'
                : 'border-border hover:border-primary/50 hover:shadow-md'
            )}
            onClick={() => setSelection('flatmates')}
          >
            <Image
              src="https://storage.googleapis.com/mansio-landing-page/flatmates.png"
              alt="Flatmates"
              width={120}
              height={120}
              className="h-28 w-28 object-contain"
              data-ai-hint="friends high-five"
            />
            <span className="text-lg font-semibold">Flatmates/Tenants</span>
          </div>
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-center gap-4 w-full">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
            <Button 
                type="button" 
                disabled={!selection}
                className="w-full sm:w-auto"
                onClick={handleContinue}
            >
                Continue
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
