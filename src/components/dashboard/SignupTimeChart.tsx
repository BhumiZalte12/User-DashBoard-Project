'use client';
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { User } from '@/types';
import dayjs from 'dayjs';

export default function SignupTimeChart({ users }: { users: User[] }) {
  const data = useMemo(() => {
    // Initialize an array for 24 hours, with counts set to 0
    const hours = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      // Format hour for display (e.g., 12AM, 1AM... 12PM, 1PM)
      name: `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? 'AM' : 'PM'}`,
      count: 0,
    }));

    // Group users by the hour they signed up
    users.forEach(user => {
      const hour = dayjs(user.createdAt).hour();
      if (hours[hour]) {
        hours[hour].count += 1;
      }
    });

    return hours;
  }, [users]);

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval={2} // Show a label every 3 hours to prevent clutter
          />
          <YAxis
            allowDecimals={false}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--muted))' }}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
