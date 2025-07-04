'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', revenue: 220000, profit: 210000 },
  { name: 'Feb', revenue: 230000, profit: 215000 },
  { name: 'Mar', revenue: 235000, profit: 218000 },
  { name: 'Apr', revenue: 240000, profit: 220000 },
  { name: 'May', revenue: 255000, profit: 225000 },
  { name: 'Jun', revenue: 265000, profit: 230000 },
];

const formatCurrency = (value: number) => `₹${(value / 1000).toFixed(0)}K`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-bold text-foreground mb-2">{label}</p>
        {payload.map((pld: any) => (
          <div key={pld.dataKey} className="flex items-center gap-2 text-sm">
            <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: pld.stroke}}></div>
            <span className="capitalize text-muted-foreground">{pld.dataKey}:</span>
            <span className="font-semibold text-foreground">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(pld.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};


export default function RevenueProfitChart() {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
           />
          <YAxis
            tickFormatter={formatCurrency}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--accent))' }}
            content={<CustomTooltip />}
          />
          <Legend 
            iconType="circle"
            formatter={(value) => (
              <span className="capitalize text-muted-foreground">{value}</span>
            )}
          />
          <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fill="url(#colorRevenue)" strokeWidth={2} />
          <Area type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" fill="url(#colorProfit)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
