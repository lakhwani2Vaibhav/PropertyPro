'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent } from './ui/card';

const data = [
  { name: 'Occupied', value: 186 },
  { name: 'Vacant', value: 14 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-3))'];

export default function PortfolioOverviewChart() {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div style={{ width: '100%', height: 250 }} className="relative">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            iconType="circle"
            formatter={(value, entry) => (
              <span className="text-muted-foreground">
                {value} ({entry.payload.value})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold">{total}</span>
        <span className="text-sm text-muted-foreground">Total Units</span>
      </div>
    </div>
  );
}
