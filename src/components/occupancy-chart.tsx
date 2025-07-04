'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, XAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card";

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

export default function OccupancyChart() {
    return (
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
    )
}
