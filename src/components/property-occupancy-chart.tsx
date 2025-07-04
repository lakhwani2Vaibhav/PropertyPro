'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';

const data = [
  { name: 'Whitefield Complex', uv: 95 },
  { name: 'JP Nagar Units', uv: 88 },
  { name: 'Koramangala Towers', uv: 92 },
  { name: 'Indiranagar Homes', uv: 98 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-2">
        <p className="font-bold">{`${label}`}</p>
        <p className="text-sm text-primary">{`Occupancy : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default function PropertyOccupancyChart() {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis unit="%" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))' }} />
          <Bar dataKey="uv" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={30}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
