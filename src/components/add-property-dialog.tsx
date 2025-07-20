
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const propertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  rent: z.coerce.number().positive('Rent must be a positive number'),
  bedrooms: z.coerce.number().int().min(1, 'Must have at least 1 bedroom'),
  bathrooms: z.coerce.number().int().min(1, 'Must have at least 1 bathroom'),
  sqft: z.coerce.number().positive('Square footage must be positive'),
  propertyType: z.string().min(1, 'Property type is required'),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export function AddPropertyDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
        address: '',
        rent: undefined,
        bedrooms: undefined,
        bathrooms: undefined,
        sqft: undefined,
        propertyType: '',
    },
  });

  async function onSubmit(data: PropertyFormValues) {
    setIsLoading(true);
    // Simulate API call to save property
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('New property data:', data);

    // In a real app, you would call a server action here to save the data.
    // e.g. const result = await addPropertyAction(data);
    
    setIsLoading(false);
    setOpen(false);
    form.reset();
    toast({
      title: 'Property Added',
      description: `"${data.address}" has been successfully added.`,
    });
  }

  return (
      <Button asChild>
        <Link href="/dashboard/properties/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Property
        </Link>
      </Button>
  );
}
