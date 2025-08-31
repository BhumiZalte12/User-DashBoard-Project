'use client';
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
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

  // Define colors that match the shadcn theme
  const COLORS = ['hsl(var(--primary))', 'hsl(var(--muted))'];

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" labelLine={false} outerRadius={80}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
