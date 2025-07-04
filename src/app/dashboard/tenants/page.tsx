'use client';

import { useState, useMemo } from 'react';
import { AddTenantDialog } from "@/components/add-tenant-dialog";
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
import { tenants as initialTenants, type Tenant } from "@/lib/mock-data";
import { MoreHorizontal, Edit, Trash2, Loader2, Search } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>(initialTenants);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<Tenant | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredTenants = useMemo(() => {
    if (!searchTerm) return tenants;
    const lowercasedTerm = searchTerm.toLowerCase();
    return tenants.filter(tenant => 
      tenant.name.toLowerCase().includes(lowercasedTerm) ||
      tenant.property.toLowerCase().includes(lowercasedTerm)
    );
  }, [tenants, searchTerm]);

  const openDeleteDialog = (tenant: Tenant) => {
    setTenantToDelete(tenant);
    setDeleteAlertOpen(true);
  };

  const handleDelete = async () => {
    if (!tenantToDelete) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTenants(tenants.filter(t => t.id !== tenantToDelete.id));
    setIsSubmitting(false);
    setDeleteAlertOpen(false);
    toast({
      title: "Tenant Deleted",
      description: "The tenant has been removed from your list.",
      variant: 'destructive',
    });
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
              <h1 className="text-3xl font-bold">Tenants</h1>
              <p className="text-muted-foreground">Manage your tenants and their information.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search tenants..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <AddTenantDialog />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.length > 0 ? (
                    filteredTenants.map((tenant) => (
                      <TableRow key={tenant.id}>
                        <TableCell className="font-medium">
                          {tenant.name}
                           <div className="sm:hidden text-muted-foreground text-xs mt-1">
                            {tenant.property}
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{tenant.property}</TableCell>
                        <TableCell>
                          <Badge variant={tenant.status === 'Active' ? 'default' : tenant.status === 'Past' ? 'secondary' : 'destructive'}>
                            {tenant.status}
                          </Badge>
                        </TableCell>
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
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" /> Edit Tenant
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onSelect={() => openDeleteDialog(tenant)}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                              >
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete Tenant
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No results found for "{searchTerm}".
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              tenant from your records.
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
