'use client';

import { useState, useMemo } from 'react';
import { AddMaintenanceDialog } from '@/components/add-maintenance-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { maintenanceRequests as initialMaintenanceRequests, type MaintenanceRequest, vendors } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { MoreHorizontal, Loader2, Search } from 'lucide-react';

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(initialMaintenanceRequests);
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  
  const [isViewOpen, setViewOpen] = useState(false);
  const [isStatusOpen, setStatusOpen] = useState(false);
  const [isAssignOpen, setAssignOpen] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { toast } = useToast();

  const filteredRequests = useMemo(() => {
    if (!searchTerm) return requests;
    const lowercasedTerm = searchTerm.toLowerCase();
    return requests.filter(req =>
      req.property.toLowerCase().includes(lowercasedTerm) ||
      req.issue.toLowerCase().includes(lowercasedTerm) ||
      req.tenant.toLowerCase().includes(lowercasedTerm)
    );
  }, [requests, searchTerm]);

  const getPriorityClass = (priority?: string) => {
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

  const getStatusClass = (status?: string) => {
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

  const handleUpdateStatus = async () => {
    if (!selectedRequest || !updatedStatus) return;
    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));
    setRequests(
      requests.map((r) =>
        r.id === selectedRequest.id ? { ...r, status: updatedStatus as MaintenanceRequest['status'] } : r
      )
    );
    setSubmitting(false);
    setStatusOpen(false);
    toast({
      title: 'Status Updated',
      description: `Request for ${selectedRequest.property} has been updated.`,
    });
  };

  const handleAssignVendor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const vendorId = formData.get('vendorId');
    if (!selectedRequest || !vendorId) return;

    setSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));
    setSubmitting(false);
    setAssignOpen(false);
    toast({
      title: 'Vendor Assigned',
      description: `Vendor assigned to request for ${selectedRequest.property}.`,
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Maintenance Requests</h1>
            <p className="text-muted-foreground">Track and manage maintenance tasks.</p>
          </div>
           <div className="flex items-center gap-2">
             <div className="relative w-full max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search requests..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <AddMaintenanceDialog />
          </div>
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
                  <TableHead className="w-[50px]">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.property}</TableCell>
                        <TableCell>{req.issue}</TableCell>
                        <TableCell>{req.dateReported}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn('border', getPriorityClass(req.priority))}>
                            {req.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn('border', getStatusClass(req.status))}>
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
                              <DropdownMenuItem onSelect={() => { setSelectedRequest(req); setViewOpen(true); }}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => { setSelectedRequest(req); setUpdatedStatus(req.status); setStatusOpen(true); }}>
                                Update Status
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => { setSelectedRequest(req); setAssignOpen(true); }}>
                                Assign Vendor
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                            No results found for "{searchTerm}".
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* View Details Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Maintenance Request Details</DialogTitle>
            <DialogDescription>{selectedRequest?.property}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="issue" className="text-right">Issue</Label>
              <div id="issue" className="col-span-3 text-sm">{selectedRequest?.issue}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tenant" className="text-right">Tenant</Label>
              <div id="tenant" className="col-span-3 text-sm">{selectedRequest?.tenant}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reported" className="text-right">Reported</Label>
              <div id="reported" className="col-span-3 text-sm">{selectedRequest?.dateReported}</div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">Priority</Label>
              <div id="priority" className="col-span-3">
                <Badge variant="outline" className={cn('border', getPriorityClass(selectedRequest?.priority))}>
                  {selectedRequest?.priority}
                </Badge>
              </div>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">Status</Label>
              <div id="status" className="col-span-3">
                 <Badge variant="outline" className={cn('border', getStatusClass(selectedRequest?.status))}>
                  {selectedRequest?.status}
                </Badge>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isStatusOpen} onOpenChange={setStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Request Status</DialogTitle>
            <DialogDescription>
              Change the status for the request at {selectedRequest?.property}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={updatedStatus} onValueChange={setUpdatedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
             <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
            <Button onClick={handleUpdateStatus} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Vendor Dialog */}
      <Dialog open={isAssignOpen} onOpenChange={setAssignOpen}>
        <DialogContent>
          <form onSubmit={handleAssignVendor}>
            <DialogHeader>
              <DialogTitle>Assign Vendor</DialogTitle>
              <DialogDescription>
                Assign a vendor to handle the request at {selectedRequest?.property}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Select name="vendorId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map(vendor => (
                      <SelectItem key={vendor.id} value={vendor.id}>{vendor.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes for Vendor</Label>
                <Textarea id="notes" name="notes" placeholder="e.g., Please contact tenant to schedule." />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                  <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Assign
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
