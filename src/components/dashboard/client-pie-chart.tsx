'use client';

import AvatarPieChart from './AvatarPieChart';
import type { User } from '../../types';


export default function ClientPieChart({ users }: { users: User[] }) {
  return <AvatarPieChart users={users} />;
}