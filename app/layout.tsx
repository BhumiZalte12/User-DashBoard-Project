import './globals.css';
import React from 'react';


export const metadata = { title: 'User Dashboard' };


export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="en">
<body>
<div>
<header className="header">
<div className="header-inner container">
<h1 style={{fontSize:18,fontWeight:600}}>User Dashboard</h1>
<nav className="nav">
<a href="/dashboard">Dashboard</a>
<a href="/users">Users</a>
</nav>
</div>
</header>
<main className="container">{children}</main>
</div>
</body>
</html>
);
}