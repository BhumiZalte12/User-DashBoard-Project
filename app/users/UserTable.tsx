import React, { useState } from 'react';
import { User } from '../../types';
import styles from './UserTable.module.css';

// Define the shape for our sorting state so it can be used in the Props interface
type SortConfig = {
  key: keyof User;
  direction: 'ascending' | 'descending';
} | null;

// --- THE FIX IS HERE ---
// The 'Props' interface was missing 'onSort' and 'sortConfig'.
// This update tells the component to expect these new props from its parent.
interface Props {
  users: User[];
  onSort: (config: SortConfig) => void;
  sortConfig: SortConfig;
}

const UserTable: React.FC<Props> = ({ users, onSort, sortConfig }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Function to request a sort change from the parent component
  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    onSort({ key, direction });
  };

  // Function to get the correct arrow indicator for the sorted column
  const getSortIndicator = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Avatar</th>
            <th className={styles.th} onClick={() => requestSort('name')}>
              Name {getSortIndicator('name')}
            </th>
            <th className={styles.th} onClick={() => requestSort('email')}>
              Email {getSortIndicator('email')}
            </th>
            <th className={styles.th} onClick={() => requestSort('createdAt')}>
              Joined Date {getSortIndicator('createdAt')}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={styles.row}
              onClick={() => setSelectedUser(user)}
            >
              <td className={styles.td}>
                <img
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`}
                  alt={`${user.name}'s avatar`}
                  className={styles.avatar}
                />
              </td>
              <td className={styles.td}>{user.name}</td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for user details */}
      {selectedUser && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedUser(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name)}&background=random&size=128`}
              alt="avatar"
              className={styles.modalAvatar}
            />
            <h2>{selectedUser.name}</h2>
            <p className={styles.modalEmail}>{selectedUser.email}</p>
            <p className={styles.modalDate}>
              Joined on {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              className={styles.modalCloseButton}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
