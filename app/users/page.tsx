'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { fetchUsers } from '../../lib/api';
import type { User } from '../../types';

// Import Components
import UserTable from '../../components/users/UserTable';
import SearchBar from '../../components/users/SearchBar';
import Pagination from '../../components/users/Pagination';
import styles from './UsersPage.module.css';

// Define how many users to show per page
const ITEMS_PER_PAGE = 10;

// Define the shape for our sorting state
type SortConfig = {
  key: keyof User;
  direction: 'ascending' | 'descending';
} | null;

export default function UsersPage() {
  // --- State Management ---
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  // --- Data Fetching ---
  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      setLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        if (isMounted) setUsers(fetchedUsers);
      } catch (error) {
        // Optionally handle error here
        if (isMounted) setUsers([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadUsers();
    return () => { isMounted = false; };
  }, []);

  // --- In-Memory Filtering, Sorting, and Pagination ---
  const processedUsers = useMemo(() => {
    let filteredUsers = [...users];

    // 1. Filter by search term
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Sort the data
    if (sortConfig !== null) {
      filteredUsers.sort((a, b) => {
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredUsers;
  }, [users, searchTerm, sortConfig]);

  // 3. Paginate the processed data
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedUsers, currentPage]);

  // --- Render ---
  if (loading) {
    return <div className={styles.centered}>Loading users...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Users</h2>
        <SearchBar onSearch={setSearchTerm} />
      </div>

      <UserTable
        users={paginatedUsers}
        onSort={setSortConfig}
        sortConfig={sortConfig}
      />

      <Pagination
        currentPage={currentPage}
        totalItems={processedUsers.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}