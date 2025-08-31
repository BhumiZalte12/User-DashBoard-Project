import React from "react";
import styles from "./RecentUsersList.module.css"; // Adjust path if needed

// Define User type if not imported
type User = {
  id: string | number;
  name: string;
  avatar?: string;
};

// ...existing code...
export default function RecentUsersList({ users }: { users: User[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.title}>Recently Joined</div>
      <div className={styles.list}>
        {users.map(u => (
          <div key={u.id} className={styles.item}>
            <img
              src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`}
              alt="avatar"
              className={styles.avatar}
            />
            <span className={styles.name}>{u.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
// ...existing code...