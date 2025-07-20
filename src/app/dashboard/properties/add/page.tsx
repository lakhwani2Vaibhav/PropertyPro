
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Loader2, ArrowLeft } from 'lucide-react';
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

export default function AddPropertyPage() {
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
    toast({
      title: 'Property Added',
      description: `"${data.address}" has been successfully added.`,
    });
    // Optionally redirect or clear form
     form.reset();
  }

  return (
    <div className="space-y-6">
        <Link href="/dashboard/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
        </Link>
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
            <CardTitle>Add New Property</CardTitle>
            <CardDescription>
                Enter the details for the new property. Click save when you're done.
            </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Full Address</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., 123 Main St, Anytown, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="propertyType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Property Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a property type" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="apartment">Apartment</SelectItem>
                                <SelectItem value="house">House</SelectItem>
                                <SelectItem value="condo">Condo</SelectItem>
                                <SelectItem value="townhouse">Townhouse</SelectItem>
                                <SelectItem value="duplex">Duplex</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="rent"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monthly Rent (₹)</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="15000" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="sqft"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Square Footage</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="1200" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="2" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Property
                        </Button>
                    </div>
                </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}
