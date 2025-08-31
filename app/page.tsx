import { fetchUsers } from "../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserPlus, Image as ImageIcon } from "lucide-react"; 

// Import the enhanced components
import UsersPerDayChart from '../components/dashboard/UsersPerDayChart';
import AvatarPieChart from '../components/dashboard/AvatarPieChart';
import RecentUsersList from '../components/dashboard/RecentUsersList';

export default async function DashboardPage() {
  const users = await fetchUsers();
  const totalUsers = users.length;
  const usersWithAvatars = users.filter(u => !!u.avatar).length;
  
  // Get the 5 most recent users for the new component
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">A summary of user activity.</p>
      </div>

      {/* --- KPI Cards with Icons --- */}
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
            <CardTitle className="text-sm font-medium">With Avatars</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersWithAvatars}</div>
            <p className="text-xs text-muted-foreground">
              {((usersWithAvatars / totalUsers) * 100).toFixed(1)}% of users
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Newest Member</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentUsers[0]?.name || 'N/A'}</div>
            <p className="text-xs text-muted-foreground">The latest user to sign up</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Main Grid for Charts and Recent Users --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Users Joined (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            {/* The chart component itself needs no changes */}
            <UsersPerDayChart users={users} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recently Joined</CardTitle>
          </CardHeader>
          <CardContent>
            {/* We will use the new, improved RecentUsersList component */}
            <RecentUsersList users={recentUsers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}