'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { fetchUsers } from '../../lib/api';
import type { User } from '@/types';
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpDown } from 'lucide-react';

const ITEMS_PER_PAGE = 10;
type SortConfig = { key: keyof User; direction: 'ascending' | 'descending' } | null;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'createdAt', direction: 'descending' });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
      setLoading(false);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);


  const processedUsers = useMemo(() => {
    const cleanedSearchTerm = searchTerm.trim().toLowerCase();
    let filteredUsers = [...users];

    if (cleanedSearchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        (user.name ?? '').trim().toLowerCase().includes(cleanedSearchTerm) ||
        (user.email ?? '').trim().toLowerCase().includes(cleanedSearchTerm)
      );
    }

    if (sortConfig !== null) {
      filteredUsers.sort((a, b) => {
        const aValue = a[sortConfig.key] ?? '';
        const bValue = b[sortConfig.key] ?? '';
        if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return filteredUsers;
  }, [users, searchTerm, sortConfig]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return processedUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [processedUsers, currentPage]);

  const totalPages = Math.ceil(processedUsers.length / ITEMS_PER_PAGE);

  const requestSort = (key: keyof User) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortIndicator = (key: keyof User) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return <ArrowUpDown className="ml-2 h-4 w-4 opacity-30" />;
  };

  if (loading) return <div className="text-center p-10 text-muted-foreground">Loading users...</div>;

  return (
    <div className="space-y-6">
      {/* This flex container now stacks vertically on mobile */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            A list of all {users.length} registered users.
          </p>
        </div>
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:max-w-sm"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead onClick={() => requestSort('name')} className="cursor-pointer hover:bg-muted/50">
                <div className="flex items-center">Name {getSortIndicator('name')}</div>
              </TableHead>
              <TableHead onClick={() => requestSort('email')} className="cursor-pointer hover:bg-muted/50">
                 <div className="flex items-center">Email {getSortIndicator('email')}</div>
              </TableHead>
              <TableHead onClick={() => requestSort('createdAt')} className="cursor-pointer hover:bg-muted/50">
                 <div className="flex items-center">Joined Date {getSortIndicator('createdAt')}</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
              <TableRow key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
      
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col items-center text-center pt-4">
               <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                  <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
                  <AvatarFallback className="text-3xl">{selectedUser?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              <DialogTitle className="text-2xl">{selectedUser?.name}</DialogTitle>
              <DialogDescription>{selectedUser?.email}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="py-2 text-center text-sm text-muted-foreground">
            <p>Joined on {selectedUser ? new Date(selectedUser.createdAt).toLocaleDateString() : ''}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setSelectedUser(null)} className="w-full">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}