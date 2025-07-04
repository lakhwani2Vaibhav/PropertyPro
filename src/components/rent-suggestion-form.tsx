'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { RentSuggestionInput, RentSuggestionOutput } from '@/ai/flows/rent-suggestion';
import { suggestRent } from '@/app/dashboard/rent-suggestion/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

const formSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
  propertyType: z.string().min(1, { message: 'Please select a property type.' }),
  furnishing: z.string().min(1, { message: 'Please select a furnishing status.' }),
  marketRate: z.coerce.number().positive({ message: 'Market rate must be a positive number.' }),
  historicalYield: z.coerce.number().min(0, { message: 'Historical yield cannot be negative.' }),
  seasonalDemand: z.string().min(1, { message: 'Please select seasonal demand.' }),
  regionalDemand: z.string().min(1, { message: 'Please select regional demand.' }),
});

export function RentSuggestionForm() {
  const [suggestion, setSuggestion] = useState<RentSuggestionOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      propertyType: '',
      furnishing: '',
      marketRate: undefined,
      historicalYield: undefined,
      seasonalDemand: '',
      regionalDemand: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);
    
    const input: RentSuggestionInput = values;
    const result = await suggestRent(input);

    if (result.success && result.data) {
      setSuggestion(result.data);
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Enter the details of your property to get an AI-powered rent suggestion.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location (City, Neighborhood)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, Mission District" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="propertyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="townhouse">Townhouse</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="furnishing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Furnishing</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="furnished">Furnished</SelectItem>
                          <SelectItem value="unfurnished">Unfurnished</SelectItem>
                          <SelectItem value="semi-furnished">Semi-furnished</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="marketRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Market Rate ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="2500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="historicalYield"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Historical Yield (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="4.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="seasonalDemand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seasonal Demand</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select demand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="regionalDemand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Regional Demand</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select demand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate Suggestion
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center min-h-[500px] sticky top-20">
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-muted-foreground">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="font-semibold">Analyzing market data...</p>
            <p className="text-sm text-center">Our AI is crunching the numbers to find the optimal rent for you.</p>
          </div>
        )}
        {error && (
            <Alert variant="destructive" className="w-full">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {suggestion && (
          <Card className="w-full bg-primary/5 border-primary/20 animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Wand2 className="h-6 w-6" />
                AI-Powered Rent Suggestion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Suggested Rent Range</p>
                <p className="text-3xl font-bold text-primary">{suggestion.suggestedRentRange}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Rationale</p>
                <Textarea readOnly value={suggestion.rationale} className="mt-1 bg-background" rows={8}/>
              </div>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-muted-foreground">This is an AI-generated suggestion. Please use it as a guide and consider other factors.</p>
            </CardFooter>
          </Card>
        )}
        {!isLoading && !suggestion && !error && (
            <div className="text-center text-muted-foreground p-8 border-2 border-dashed rounded-lg w-full">
                <Wand2 className="mx-auto h-12 w-12" />
                <h3 className="mt-4 text-lg font-medium">Your suggestion will appear here</h3>
                <p className="mt-1 text-sm">Fill out the form to get started.</p>
            </div>
        )}
      </div>
    </div>
  );
}
