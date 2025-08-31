'use client';
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../lib/api';
import type { User } from '../../types';
import UserTable from '../../components/users/UserTable';


export default function UsersPage() {
const [data, setData] = useState<User[]>([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
fetchUsers().then(u => setData(u)).finally(()=>setLoading(false));
}, []);


return (
<div>
<h2 style={{fontSize:20,fontWeight:600, marginBottom:12}}>Users</h2>
{loading ? (<div>Loading...</div>) : (<UserTable users={data} />)}
</div>
);
}