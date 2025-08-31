'use client';
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import type { User } from '../../types';
import styles from './AvatarPieChart.module.css';


export default function AvatarPieChart({ users }: { users: User[] }) {
const data = useMemo(() => {
const withAvatar = users.filter(u => !!u.avatar).length;
const without = users.length - withAvatar;
return [ { name: 'With Avatar', value: withAvatar }, { name: 'No Avatar', value: without } ];
}, [users]);


return (
<div className={styles.card}>
<div className={styles.title}>Avatar Distribution</div>
<div style={{ width: '100%', height: 200 }}>
<ResponsiveContainer>
<PieChart>
<Pie data={data} dataKey="value" nameKey="name" label outerRadius={70}>
{data.map((_, i) => (
<Cell key={i} fill={i === 0 ? '#16a34a' : '#ef4444'} />
))}
</Pie>
<Tooltip />
<Legend />
</PieChart>
</ResponsiveContainer>
</div>
</div>
);
}