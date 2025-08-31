import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Menu, Users } from "lucide-react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "User Management Dashboard",
  description: "A beautiful, responsive dashboard for managing users.",
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
          "min-h-screen bg-secondary/50 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              
              <div className="container flex h-14 items-center px-4">
                
                <div className="md:hidden">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="pr-0">
                      <nav className="grid gap-4 text-lg font-medium">
                        <Link
                          href="/"
                          className="flex items-center gap-2 text-lg font-semibold"
                        >
                          <LayoutDashboard className="h-6 w-6 text-primary" />
                          <span>Userboard</span>
                        </Link>
                        <Link
                          href="/"
                          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          Dashboard
                        </Link>
                        <Link
                          href="/users"
                          className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                          <Users className="h-5 w-5" />
                          Users
                        </Link>
                      </nav>
                    </SheetContent>
                  </Sheet>
                </div>

               
                <div className="hidden md:flex flex-1 items-center">
                   <Link href="/" className="mr-6 flex items-center space-x-2">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                    <span className="font-bold">Userboard</span>
                  </Link>
                  <nav className="flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
                    <Link href="/" className="text-muted-foreground transition-colors hover:text-primary">
                      Dashboard
                    </Link>
                    <Link href="/users" className="text-muted-foreground transition-colors hover:text-primary">
                      Users
                    </Link>
                  </nav>
                </div>

              
                <div className="flex items-center justify-end flex-1 md:flex-initial space-x-2">
                  <ModeToggle />
                </div>
              </div>
            </header>
         
            <main className="flex-1 container py-4 md:py-8 px-4">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}