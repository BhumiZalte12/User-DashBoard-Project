import React from 'react';
import StatCard from '../../components/dashboard/StatCard';
import UsersPerDayChart from '../../components/dashboard/UsersPerDayChart';
import AvatarPieChart from '../../components/dashboard/AvatarPieChart';
import RecentUsersList from '../../components/dashboard/RecentUsersList';
import { fetchUsers } from '../../lib/api';


export default async function DashboardPage() {
const users = await fetchUsers();


return (
    <div>
      <h2 style={{fontSize:20,fontWeight:600, marginBottom:12}}>Dashboard</h2>

      <div style={{display:'grid', gridTemplateColumns:'1fr 2fr', gap:16, marginBottom:16}}>
        <StatCard title="Total Users" value={String(users.length)} />
        <UsersPerDayChart users={users} />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
        <AvatarPieChart users={users} />
        <RecentUsersList users={
          users
            .slice()
            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
            .slice(0, 5)
        } />
      </div>
    </div>
  );
}