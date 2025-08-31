import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "A dashboard for managing users",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container h-14 flex items-center justify-between">
              <Link href="/" className="font-bold">
                User Dashboard
              </Link>
              <nav className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/users" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                  Users
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1 container py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}