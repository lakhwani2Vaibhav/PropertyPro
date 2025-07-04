'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddPropertyDialog } from "@/components/add-property-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { properties as initialProperties, type Property } from "@/lib/mock-data";
import { MoreHorizontal, Edit, Trash2, Loader2, Search } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const propertySchema = z.object({
  address: z.string().min(1, 'Address is required'),
  rent: z.coerce.number().positive('Rent must be a positive number'),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const form = useForm<PropertyFormValues>();

  const filteredProperties = useMemo(() => {
    if (!searchTerm) return properties;
    const lowercasedTerm = searchTerm.toLowerCase();
    return properties.filter(prop => 
      prop.address.toLowerCase().includes(lowercasedTerm) ||
      prop.tenant.toLowerCase().includes(lowercasedTerm)
    );
  }, [properties, searchTerm]);

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    form.reset({ address: property.address, rent: property.rent });
    setEditOpen(true);
  };

  const onSubmit = async (data: PropertyFormValues) => {
    if (!selectedProperty) return;
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProperties(properties.map(p => p.id === selectedProperty.id ? { ...p, ...data } : p));
    setSubmitting(false);
    setEditOpen(false);
    toast({
      title: "Property Updated",
      description: `"${data.address}" has been successfully updated.`
    });
  };

  const openDeleteDialog = (property: Property) => {
    setPropertyToDelete(property);
    setDeleteAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!propertyToDelete) return;
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProperties(properties.filter(p => p.id !== propertyToDelete.id));
    setSubmitting(false);
    setDeleteAlertOpen(false);
    toast({
      title: "Property Deleted",
      description: "The property has been removed from your portfolio.",
      variant: 'destructive',
    });
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
              <h1 className="text-3xl font-bold">Properties</h1>
              <p className="text-muted-foreground">Manage your property portfolio.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search properties..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <AddPropertyDialog />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Address</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Tenant</TableHead>
                  <TableHead className="text-right">Rent</TableHead>
                  <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length > 0 ? (
                    filteredProperties.map((prop) => (
                      <TableRow key={prop.id}>
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/properties/${prop.id}`} className="hover:underline">
                            {prop.address}
                          </Link>
                          <div className="sm:hidden text-muted-foreground text-xs mt-1">
                            {prop.status}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant={prop.status === 'Occupied' ? 'default' : 'secondary'}>
                            {prop.status}
                          </Badge>
                        </TableCell>
                        <TableCell className={prop.status === 'Vacant' || prop.status === 'Pending' ? 'text-muted-foreground hidden md:table-cell' : 'hidden md:table-cell'}>
                          {prop.tenant}
                        </TableCell>
                        <TableCell className="text-right">₹{prop.rent.toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onSelect={() => handleEdit(prop)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Property
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                               <DropdownMenuItem
                                onSelect={() => openDeleteDialog(prop)}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                              >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete Property
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No results found for "{searchTerm}".
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

       <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[480px]">
           <DialogHeader>
            <DialogTitle>Edit Property</DialogTitle>
            <DialogDescription>
              Update the details for this property. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
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
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              property from your portfolio.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
