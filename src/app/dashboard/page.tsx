import { ArrowLeft, Home, LayoutDashboard, Lightbulb, TrendingUp, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RevenueProfitChart from "@/components/revenue-profit-chart";
import PropertyOccupancyChart from "@/components/property-occupancy-chart";
import PortfolioOverviewChart from "@/components/portfolio-overview-chart";
import Balancer from "react-wrap-balancer";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
            <Button variant="ghost" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Landlords
            </Button>
            <h1 className="text-3xl font-bold">
                <Balancer>Landlord Analytics Demo</Balancer>
            </h1>
        </div>
      </header>

      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="analytics">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Analytics Dashboard
          </TabsTrigger>
          <TabsTrigger value="portfolio">
            <Wallet className="mr-2 h-4 w-4" />
            Virtual Portfolio
          </TabsTrigger>
        </TabsList>
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Revenue"
              value="₹2.65L"
              change="+12% from last month"
              icon={<span className="text-lg font-bold text-muted-foreground/80">$</span>}
            />
            <StatCard
              title="Total Properties"
              value="24"
              change="Across 4 locations"
              icon={<Home className="text-muted-foreground" />}
            />
            <StatCard
              title="Active Tenants"
              value="186"
              change="93% occupancy rate"
              icon={<Users className="text-muted-foreground" />}
            />
            <StatCard
              title="Monthly Profit"
              value="₹2.13L"
              change="+8% from last month"
              icon={<TrendingUp className="text-muted-foreground" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Revenue & Profit Trends</CardTitle>
                <p className="text-sm text-muted-foreground">Monthly financial performance overview</p>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueProfitChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Property Occupancy Rates</CardTitle>
                <p className="text-sm text-muted-foreground">Occupancy percentage by property location</p>
              </CardHeader>
              <CardContent className="pl-2">
                <PropertyOccupancyChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Portfolio Overview</CardTitle>
                    <p className="text-sm text-muted-foreground">Total units distribution</p>
                </CardHeader>
                <CardContent>
                    <PortfolioOverviewChart />
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Top Performing Property</CardTitle>
                    <p className="text-sm text-muted-foreground">Highest yield this month</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold">Whitefield Complex</h3>
                        <p className="text-sm text-muted-foreground">12 units • 100% occupied</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-primary">₹95,000</p>
                        <p className="text-sm text-muted-foreground">Monthly revenue</p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">High Yield</Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">Premium Location</Badge>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Market Insights</CardTitle>
                    <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <InsightItem
                        title="Rent Optimization"
                        description="Consider 6% increase in JP Nagar"
                        color="blue"
                    />
                    <InsightItem
                        title="High Demand Alert"
                        description="Indiranagar area showing 15% growth"
                        color="green"
                    />
                     <InsightItem
                        title="Maintenance Due"
                        description="3 properties need attention"
                        color="orange"
                    />
                </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  );
}

function InsightItem({title, description, color}: {title: string, description: string, color: 'blue' | 'green' | 'orange'}) {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200 text-blue-800',
        green: 'bg-green-50 border-green-200 text-green-800',
        orange: 'bg-orange-50 border-orange-200 text-orange-800',
    }
    return (
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
            <div className="flex items-start gap-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${color === 'blue' ? 'bg-blue-500' : color === 'green' ? 'bg-green-500' : 'bg-orange-500'}`} />
                <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    )
}
