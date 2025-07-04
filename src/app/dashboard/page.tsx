import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Building, Users, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard title="Total Rent Collected" value="$12,345" icon={<DollarSign className="h-6 w-6 text-muted-foreground" />} />
                <DashboardCard title="Active Properties" value="5" icon={<Building className="h-6 w-6 text-muted-foreground" />} />
                <DashboardCard title="Active Tenants" value="8" icon={<Users className="h-6 w-6 text-muted-foreground" />} />
                <DashboardCard title="Overdue Rents" value="2" icon={<AlertTriangle className="h-6 w-6 text-destructive" />} isDestructive={true} />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                       <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Tenant</TableHead>
                              <TableHead>Property</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Date</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                                <TableCell>Jane Smith</TableCell>
                                <TableCell>123 Maple St, Apt 4B</TableCell>
                                <TableCell>$1,500.00</TableCell>
                                <TableCell>2024-07-01</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Mike Johnson</TableCell>
                                <TableCell>456 Oak Ave, Unit 2</TableCell>
                                <TableCell>$2,200.00</TableCell>
                                <TableCell>2024-07-01</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Emily White</TableCell>
                                <TableCell>789 Pine Ln, Main House</TableCell>
                                <TableCell>$3,100.00</TableCell>
                                <TableCell>2024-06-30</TableCell>
                            </TableRow>
                          </TableBody>
                       </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

function DashboardCard({ title, value, icon, isDestructive = false }: { title: string, value: string, icon: React.ReactNode, isDestructive?: boolean }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${isDestructive ? 'text-destructive' : ''}`}>{value}</div>
            </CardContent>
        </Card>
    );
}
