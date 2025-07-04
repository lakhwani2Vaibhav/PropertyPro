import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import OccupancyChart from "@/components/occupancy-chart";

const properties = [
  { address: "123 Oak Street, Anytown", rent: "$1,500", tenant: "Sarah Miller", status: "Occupied" },
  { address: "456 Pine Avenue, Anytown", rent: "$1,200", tenant: "David Lee", status: "Occupied" },
  { address: "789 Maple Drive, Anytown", rent: "$1,800", tenant: "Vacant", status: "Vacant" },
  { address: "101 Elm Court, Anytown", rent: "$1,300", tenant: "Pending", status: "Pending" },
  { address: "222 Cedar Lane, Anytown", rent: "$1,600", tenant: "Emily Chen", status: "Occupied" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your properties and performance</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Properties" value="12" />
        <StatCard title="Occupancy Rate" value="92%" />
        <StatCard title="Rent Collected" value="$15,000" />
        <StatCard title="Outstanding Balance" value="$1,200" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Property Summary</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Rent Amount</TableHead>
                <TableHead>Tenant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((prop) => (
                <TableRow key={prop.address}>
                  <TableCell className="font-medium">{prop.address}</TableCell>
                  <TableCell>{prop.rent}</TableCell>
                  <TableCell className="text-muted-foreground">{prop.tenant}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium">{prop.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="link" className="text-primary h-auto p-0">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
        <div className="flex gap-2">
            <Button>Add Property</Button>
            <Button variant="outline">View All Properties</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold">Key Performance Indicators</h2>
            <div className="grid gap-4 md:grid-cols-2">
                <KpiCard title="ROI" value="8.5%" />
                <KpiCard title="Avg. Rent per Sq Ft" value="$1.25" />
            </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold">Occupancy Trends</h2>
            <OccupancyChart />
        </div>
      </div>

    </div>
  )
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <Card className="bg-muted border-0">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function KpiCard({ title, value }: { title: string, value: string }) {
    return (
      <Card>
        <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-3xl font-bold">{value}</p>
        </CardContent>
      </Card>
    );
}