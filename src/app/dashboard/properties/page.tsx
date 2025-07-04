import { AddPropertyDialog } from "@/components/add-property-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

// This is mock data. In a real application, you'd fetch this from a database.
const properties = [
  { id: 1, address: "123 Oak Street, Anytown", rent: 1500, tenant: "Sarah Miller", status: "Occupied" },
  { id: 2, address: "456 Pine Avenue, Anytown", rent: 1200, tenant: "David Lee", status: "Occupied" },
  { id: 3, address: "789 Maple Drive, Anytown", rent: 1800, tenant: "Vacant", status: "Vacant" },
  { id: 4, address: "101 Elm Court, Anytown", rent: 1300, tenant: "Pending", status: "Pending" },
  { id: 5, address: "222 Cedar Lane, Anytown", rent: 1600, tenant: "Emily Chen", status: "Occupied" },
  { id: 6, address: "333 Birch Place, Anytown", rent: 2100, tenant: "Vacant", status: "Vacant" },
];

export default function PropertiesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Properties</h1>
            <p className="text-muted-foreground">Manage your property portfolio.</p>
        </div>
        <AddPropertyDialog />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead className="text-right">Rent</TableHead>
                <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((prop) => (
                <TableRow key={prop.id}>
                  <TableCell className="font-medium">{prop.address}</TableCell>
                  <TableCell>
                    <Badge variant={prop.status === 'Occupied' ? 'default' : 'secondary'}>
                      {prop.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={prop.status === 'Vacant' || prop.status === 'Pending' ? 'text-muted-foreground' : ''}>
                    {prop.tenant}
                  </TableCell>
                  <TableCell className="text-right">${prop.rent.toLocaleString()}</TableCell>
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
                        <DropdownMenuItem>Edit Property</DropdownMenuItem>
                        <DropdownMenuItem>View Lease</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Delete Property
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
