'use client';

import { useState, useMemo } from "react";
import { AddLeaseDialog } from "@/components/add-lease-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { leases } from "@/lib/mock-data";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function LeasesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'Expired':
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'Pending Signature':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const filteredLeases = useMemo(() => {
    if (!searchTerm) return leases;
    const lowercasedTerm = searchTerm.toLowerCase();
    return leases.filter(lease =>
      lease.property.toLowerCase().includes(lowercasedTerm) ||
      lease.tenant.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Lease Management</h1>
        <div className="flex items-center gap-2">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by property or tenant..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <AddLeaseDialog />
        </div>
      </div>

      <Card>
        <CardHeader className="p-0">
          <div className="grid grid-cols-10 gap-4 px-6 py-4 border-b font-semibold text-muted-foreground">
            <div className="col-span-3">Property Address</div>
            <div className="col-span-2">Tenant Name</div>
            <div className="col-span-2">Lease Start Date</div>
            <div className="col-span-2">Lease End Date</div>
            <div className="col-span-1">Status</div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLeases.length > 0 ? (
                filteredLeases.map((lease) => (
                  <div key={lease.id} className="grid grid-cols-10 gap-4 px-6 py-4 items-center">
                    <div className="col-span-3 font-medium">
                      {lease.property.split(',').map((line, index) => (
                          <div key={index}>{line.trim()}</div>
                      ))}
                    </div>
                    <div className="col-span-2">
                      <Link href="#" className="text-primary hover:underline">
                        {lease.tenant}
                      </Link>
                    </div>
                    <div className="col-span-2">{format(lease.startDate, "MM/dd/yyyy")}</div>
                    <div className="col-span-2">{format(lease.endDate, "MM/dd/yyyy")}</div>
                    <div className="col-span-1">
                       <Badge
                        className={cn(
                          "px-3 py-1 rounded-full font-medium border-transparent text-xs",
                           getStatusClass(lease.status)
                        )}
                      >
                        {lease.status}
                      </Badge>
                    </div>
                  </div>
                ))
            ) : (
                <div className="text-center p-8 text-muted-foreground">
                    No leases found for "{searchTerm}".
                </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
