'use client';
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { User } from '../../types';
import dayjs from 'dayjs';

export default function UsersPerDayChart({ users }: { users: User[] }) {
  const last30 = useMemo(() => {
    const map = new Map<string, number>();
    for (let i = 29; i >= 0; i--) {
      const key = dayjs().subtract(i, 'day').format('YYYY-MM-DD');
      map.set(key, 0);
    }
    users.forEach(u => {
      const d = dayjs(u.createdAt).format('YYYY-MM-DD');
      if (map.has(d)) map.set(d, (map.get(d) || 0) + 1);
    });
    return Array.from(map.entries()).map(([date, count]) => ({ date: dayjs(date).format('DD MMM'), count }));
  }, [users]);

  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <LineChart data={last30}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
