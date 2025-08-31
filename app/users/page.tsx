'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { fetchUsers } from '../../lib/api';
import type { User } from '../../types';
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
import { Avatar, AvatarFallback, AvatarImage } from "../../src/components/ui/avatar"; 

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

  const processedUsers = useMemo(() => {
    let filteredUsers = [...users];
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortConfig !== null) {
      filteredUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
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
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (loading) return <div className="text-center p-10">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            A list of all registered users.
          </p>
        </div>
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead onClick={() => requestSort('name')} className="cursor-pointer hover:bg-muted/50">Name</TableHead>
              <TableHead onClick={() => requestSort('email')} className="cursor-pointer hover:bg-muted/50">Email</TableHead>
              <TableHead onClick={() => requestSort('createdAt')} className="cursor-pointer hover:bg-muted/50">Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer">
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

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
      
      {/* User Detail Modal */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <div className="flex flex-col items-center text-center pt-4">
               <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={selectedUser?.avatar} alt={selectedUser?.name} />
                  <AvatarFallback>{selectedUser?.name.charAt(0)}</AvatarFallback>
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