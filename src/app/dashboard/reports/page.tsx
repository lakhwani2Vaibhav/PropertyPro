import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { financialSummary, rentPayments } from "@/lib/mock-data";


export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Analyze your portfolio's financial performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard 
          title="Total Revenue (YTD)" 
          value={`₹${financialSummary.totalRevenue.toLocaleString('en-IN')}`} 
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />} 
        />
        <StatCard 
          title="Total Expenses (YTD)" 
          value={`₹${financialSummary.totalExpenses.toLocaleString('en-IN')}`} 
          icon={<TrendingDown className="h-5 w-5 text-muted-foreground" />} 
        />
        <StatCard 
          title="Net Income (YTD)" 
          value={`₹${financialSummary.netIncome.toLocaleString('en-IN')}`} 
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />} 
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Rent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.tenant}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge variant={payment.status === 'Paid' ? 'secondary' : 'destructive'}>
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">₹{payment.amount.toLocaleString('en-IN')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
        </CardContent>
      </Card>
    );
}
