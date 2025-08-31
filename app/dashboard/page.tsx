import { fetchUsers } from "../../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// We can keep the same chart components, they will just live inside our new cards
import UsersPerDayChart from '../../components/dashboard/UsersPerDayChart';
import AvatarPieChart from '../../components/dashboard/AvatarPieChart';
import RecentUsersList from '../../components/dashboard/RecentUsersList';


export default async function DashboardPage() {
  const users = await fetchUsers();
  const totalUsers = users.length;
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Users Created (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <UsersPerDayChart users={users} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <AvatarPieChart users={users} />
          </CardContent>
        </Card>

      </div>
       <Card>
          <CardHeader>
            <CardTitle>Recently Joined</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentUsersList users={recentUsers} />
          </CardContent>
        </Card>
    </div>
  );
}