'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Area, AreaChart, XAxis, YAxis } from "recharts"

const chartData = [
    { month: "Jan", rate: 82 },
    { month: "Feb", rate: 85 },
    { month: "Mar", rate: 87 },
    { month: "Apr", rate: 84 },
    { month: "May", rate: 80 },
    { month: "Jun", rate: 86 },
    { month: "Jul", rate: 92 },
];

const chartConfig = {
  rate: {
    label: "Occupancy Rate",
    color: "hsl(var(--chart-1))",
  },
};

export default function OccupancyChart() {
    return (
        <div className="h-full flex flex-col">
            <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate Over Time</p>
                <p className="text-4xl font-bold mt-1">92%</p>
                <p className="text-xs text-muted-foreground">
                    <span className="text-green-600 font-semibold">+5%</span> vs Last 12 Months
                </p>
            </div>

            <div className="flex-1 h-[200px] -ml-4 mt-4">
                <ChartContainer config={chartConfig} className="h-full w-full">
                <AreaChart accessibilityLayer data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                    <linearGradient id="fillOccupancy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-rate)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-rate)" stopOpacity={0.1} />
                    </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} stroke="hsl(var(--muted-foreground))" />
                    <YAxis hide={true} domain={['dataMin - 20', 'dataMax + 5']} />
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" hideLabel hideIndicator />}
                    />
                    <Area
                    dataKey="rate"
                    type="natural"
                    fill="url(#fillOccupancy)"
                    stroke="var(--color-rate)"
                    strokeWidth={2.5}
                    dot={false}
                    />
                </AreaChart>
                </ChartContainer>
            </div>
        </div>
    )
}
