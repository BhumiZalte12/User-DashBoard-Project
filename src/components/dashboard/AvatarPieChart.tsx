'use client';
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { User } from '../../types';

export default function AvatarPieChart({ users }: { users: User[] }) {
  const data = useMemo(() => {
    const withAvatar = users.filter(u => !!u.avatar).length;
    const without = users.length - withAvatar;
    return [
      { name: 'With Avatar', value: withAvatar },
      { name: 'No Avatar', value: without }
    ];
  }, [users]);

  
  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
  ];

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Tooltip
          cursor={{ fill: 'hsl(var(--muted))' }}
          contentStyle={{
            background: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          strokeWidth={2}
          stroke="hsl(var(--background))"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}