import { AddLeaseDialog } from "@/components/add-lease-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { leases } from "@/lib/mock-data";
import { format } from "date-fns";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function LeasesPage() {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Lease Management</h1>
        <AddLeaseDialog />
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
            {leases.map((lease) => (
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
