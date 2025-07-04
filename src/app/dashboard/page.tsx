import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis } from "recharts"

const properties = [
  { address: "123 Oak Street, Anytown", rent: "$1,500", tenant: "Sarah Miller", status: "Occupied" },
  { address: "456 Pine Avenue, Anytown", rent: "$1,200", tenant: "David Lee", status: "Occupied" },
  { address: "789 Maple Drive, Anytown", rent: "$1,800", tenant: "Vacant", status: "Vacant" },
  { address: "101 Elm Court, Anytown", rent: "$1,300", tenant: "Pending", status: "Pending" },
  { address: "222 Cedar Lane, Anytown", rent: "$1,600", tenant: "Emily Chen", status: "Occupied" },
];

const chartData = [
  { month: "Jan", rate: 88 }, { month: "Feb", rate: 89 }, { month: "Mar", rate: 91 },
  { month: "Apr", rate: 87 }, { month: "May", rate: 85 }, { month: "Jun", rate: 93 },
  { month: "Jul", rate: 92 },
];

const chartConfig = {
  rate: {
    label: "Occupancy Rate",
    color: "hsl(var(--primary))",
  },
};

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
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Occupancy Rate Over Time</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold">92%</p>
                  <p className="text-sm font-semibold text-green-600">+5%</p>
                </div>
                <p className="text-xs text-muted-foreground">vs Last 12 Months</p>

                <div className="h-[150px] -ml-4 mt-4">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="fillOccupancy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-rate)" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="var(--color-rate)" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                      <ChartTooltip
                        cursor={true}
                        content={<ChartTooltipContent indicator="dot" hideLabel />}
                      />
                      <Area
                        dataKey="rate"
                        type="natural"
                        fill="url(#fillOccupancy)"
                        stroke="var(--color-rate)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
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
