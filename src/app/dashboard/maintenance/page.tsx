import { AddMaintenanceDialog } from "@/components/add-maintenance-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { maintenanceRequests } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

export default function MaintenancePage() {
    const getPriorityClass = (priority: string) => {
        switch (priority) {
            case 'High':
                return 'bg-red-100 text-red-800 hover:bg-red-200 border-red-200';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-200';
            case 'Low':
                return 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Open':
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200';
            case 'In Progress':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200';
            case 'Completed':
                return 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold">Maintenance Requests</h1>
            <p className="text-muted-foreground">Track and manage maintenance tasks.</p>
        </div>
        <AddMaintenanceDialog />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Property</TableHead>
                <TableHead className="w-[35%]">Issue</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell className="font-medium">{req.property}</TableCell>
                  <TableCell>{req.issue}</TableCell>
                  <TableCell>{req.dateReported}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border", getPriorityClass(req.priority))}>
                      {req.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant="outline" className={cn("border", getStatusClass(req.status))}>
                      {req.status}
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>Assign Vendor</DropdownMenuItem>
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
