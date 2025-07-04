import { Home, LayoutDashboard, Lightbulb, TrendingUp, Users, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import RevenueProfitChart from "@/components/revenue-profit-chart";
import PropertyOccupancyChart from "@/components/property-occupancy-chart";
import PortfolioOverviewChart from "@/components/portfolio-overview-chart";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

const portfolioProperties = [
    { id: 1, address: "Whitefield Complex", type: "Apartment", status: "Occupied", rent: 95000, occupancy: "12/12 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "modern apartment" },
    { id: 2, address: "JP Nagar Units", type: "House", status: "Occupied", rent: 75000, occupancy: "1/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "suburban house" },
    { id: 3, address: "Koramangala Towers", type: "Apartment", status: "Vacant", rent: 82000, occupancy: "8/9 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "apartment building" },
    { id: 4, address: "Indiranagar Homes", type: "House", status: "Occupied", rent: 120000, occupancy: "1/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "luxury home" },
    { id: 5, address: "HSR Layout Loft", type: "Apartment", status: "Occupied", rent: 65000, occupancy: "4/4 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "urban loft" },
    { id: 6, address: "Marathahalli Place", type: "Condo", status: "Vacant", rent: 58000, occupancy: "0/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "condo exterior" },
  ];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold">
                <Balancer>Landlord Analytics</Balancer>
            </h1>
            <p className="text-muted-foreground">Welcome back, analyze your portfolio performance.</p>
        </div>
      </header>

      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-2 md:max-w-md">
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
              icon={<TrendingUp className="text-muted-foreground" />}
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
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">High Yield</Badge>
                        <Badge variant="secondary">Premium Location</Badge>
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
                    />
                    <InsightItem
                        title="High Demand Alert"
                        description="Indiranagar area showing 15% growth"
                    />
                     <InsightItem
                        title="Maintenance Due"
                        description="3 properties need attention"
                    />
                </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="portfolio" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {portfolioProperties.map((prop) => (
                <Card key={prop.id} className="overflow-hidden flex flex-col group">
                    <div className="relative">
                        <Image src={prop.imageUrl} alt={prop.address} width={600} height={400} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={prop.imageHint} />
                        <Badge className="absolute top-3 right-3" variant={prop.status === 'Occupied' ? 'default' : 'secondary'}>{prop.status}</Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg">{prop.address}</CardTitle>
                        <p className="text-sm text-muted-foreground">{prop.type}</p>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">Rent</span>
                            <span className="font-semibold">₹{prop.rent.toLocaleString()}/mo</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm">Occupancy</span>
                            <span className="font-semibold">{prop.occupancy}</span>
                        </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-2">
                        <Button variant="outline" size="sm" className="w-full">View Details</Button>
                    </CardFooter>
                </Card>
                ))}
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

function InsightItem({title, description}: {title: string, description: string}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="h-3 w-3 text-primary"/>
                </div>
            </div>
            <div>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
    )
}
