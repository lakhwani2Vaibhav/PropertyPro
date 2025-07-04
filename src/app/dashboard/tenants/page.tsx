import { AddTenantDialog } from "@/components/add-tenant-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

const tenants = [
  { id: 1, name: "Sarah Miller", property: "123 Oak Street, Anytown", status: "Active" },
  { id: 2, name: "David Lee", property: "456 Pine Avenue, Anytown", status: "Active" },
  { id: 3, name: "Emily Chen", property: "222 Cedar Lane, Anytown", status: "Active" },
  { id: 4, name: "Michael Rodriguez", property: "333 Birch Place, Anytown", status: "Past" },
  { id: 5, name: "Jessica Williams", property: "101 Elm Court, Anytown", status: "Eviction" },
];

export default function TenantsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Tenants</h1>
            <p className="text-muted-foreground">Manage your tenants and their information.</p>
        </div>
        <AddTenantDialog />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>{tenant.property}</TableCell>
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
                        <DropdownMenuItem>Edit Tenant</DropdownMenuItem>
                        <DropdownMenuItem>View Lease</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Delete Tenant
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
