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

interface LookingForDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LookingForDialog({ open, onOpenChange }: LookingForDialogProps) {
  const [selection, setSelection] = useState<'flat' | 'flatmates' | null>(null);

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
              src="https://atrean.s3.ap-south-1.amazonaws.com/image-files/67ada587e6dc894b280be886/67ada45ce6dc894b280be885/67b0728ee6dc894b280c0576/flat.svg"
              alt="Flat"
              width={120}
              height={120}
              className="h-28 w-28 object-contain"
              data-ai-hint="house illustration"
            />
            <span className="text-lg font-semibold">Flat</span>
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
              src="https://atrean.s3.ap-south-1.amazonaws.com/image-files/67ada587e6dc894b280be886/67ada45ce6dc894b280be885/67b072c1e6dc894b280c0577/flatmates.svg"
              alt="Flatmates"
              width={120}
              height={120}
              className="h-28 w-28 object-contain"
              data-ai-hint="friends high-five"
            />
            <span className="text-lg font-semibold">Flatmates</span>
          </div>
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-center gap-4 w-full">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Close
            </Button>
          </DialogClose>
           <Link href="/login" className="w-full sm:w-auto">
                <Button 
                    type="button" 
                    disabled={!selection}
                    className="w-full"
                >
                    Continue
                </Button>
            </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
