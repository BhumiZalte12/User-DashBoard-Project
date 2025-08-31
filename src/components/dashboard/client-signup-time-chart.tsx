'use client';

// This wrapper ensures the SignupTimeChart is treated as a client-only component.
import SignupTimeChart from './SignupTimeChart';
import type { User } from '@/types';

export default function ClientSignupTimeChart({ users }: { users: User[] }) {
  return <SignupTimeChart users={users} />;
}
