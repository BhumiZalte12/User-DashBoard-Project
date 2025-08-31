import { fetchUsers } from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users, UserPlus } from "lucide-react";
import UsersPerDayChart from '@/components/dashboard/UsersPerDayChart';
import RecentUsersList from '@/components/dashboard/RecentUsersList';
import dynamic from 'next/dynamic';

const ClientPieChart = dynamic(() => import('@/components/dashboard/client-pie-chart'), {
  ssr: false,
  loading: () => <div className="h-[220px] w-full flex items-center justify-center text-sm text-muted-foreground">Loading Chart...</div>,
});

export default async function DashboardPage() {
  const users = await fetchUsers();
  const totalUsers = users.length;
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">A summary of your user base.</p>
      </div>

      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">All registered users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active This Month</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{users.filter(u => new Date(u.createdAt) > new Date(new Date().setDate(new Date().getDate() - 30))).length}</div>
            <p className="text-xs text-muted-foreground">in the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Newest Member</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{recentUsers[0]?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">The latest user to sign up</p>
          </CardContent>
        </Card>
      </div>

     
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users in the last 30 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <UsersPerDayChart users={users} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Avatar Distribution</CardTitle>
            <CardDescription>How many users have a profile picture.</CardDescription>
          </CardHeader>
          <CardContent>
              <ClientPieChart users={users} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recently Joined</CardTitle>
          <CardDescription>The 5 newest members of your community.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentUsersList users={recentUsers} />
        </CardContent>
      </Card>
    </div>
  );
}