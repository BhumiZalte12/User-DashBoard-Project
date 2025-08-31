import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"; // Renamed for clarity
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../components/theme-provider"; // Import ThemeProvider

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "A dashboard for managing users with modern UI",
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
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system" // Default to system theme (light/dark)
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {/* Enhanced Header/Navbar */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 font-bold text-lg hover:text-primary transition-colors">
                  <span className="sr-only">Home</span>
                  User Dashboard
                </Link>
                <nav className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/users"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Users
                  </Link>
                  {/* You can add a Theme Toggle here later if desired */}
                </nav>
              </div>
            </header>
            <main className="flex-1 container py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
