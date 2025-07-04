import { AddLeaseDialog } from "@/components/add-lease-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

const leases = [
  { id: 1, property: "123 Oak Street, Anytown", tenant: "Sarah Miller", startDate: new Date("2023-08-01"), endDate: new Date("2024-07-31"), rent: 1500, status: "Active" },
  { id: 2, property: "456 Pine Avenue, Anytown", tenant: "David Lee", startDate: new Date("2023-06-15"), endDate: new Date("2024-06-14"), rent: 1200, status: "Active" },
  { id: 3, property: "222 Cedar Lane, Anytown", tenant: "Emily Chen", startDate: new Date("2024-01-01"), endDate: new Date("2024-12-31"), rent: 1600, status: "Active" },
  { id: 4, property: "333 Birch Place, Anytown", tenant: "Michael Rodriguez", startDate: new Date("2022-11-01"), endDate: new Date("2023-10-31"), rent: 2100, status: "Expired" },
  { id: 5, property: "101 Elm Court, Anytown", tenant: "Jessica Williams", startDate: new Date("2024-03-01"), endDate: new Date("2025-02-28"), rent: 1300, status: "Upcoming" },
];

export default function LeasesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Leases</h1>
            <p className="text-muted-foreground">Manage all lease agreements.</p>
        </div>
        <AddLeaseDialog />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Rent</TableHead>
                <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leases.map((lease) => (
                <TableRow key={lease.id}>
                  <TableCell className="font-medium">{lease.property}</TableCell>
                  <TableCell>{lease.tenant}</TableCell>
                  <TableCell>
                    {format(lease.startDate, "MMM d, yyyy")} - {format(lease.endDate, "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={lease.status === 'Active' ? 'default' : lease.status === 'Expired' ? 'secondary' : 'outline'}>
                      {lease.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">${lease.rent.toLocaleString()}</TableCell>
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
                        <DropdownMenuItem>Edit Lease</DropdownMenuItem>
                        <DropdownMenuItem>Renew Lease</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Terminate Lease
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
