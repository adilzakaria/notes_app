"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, LogOut, User } from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">Notes App</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link
                href="/dashboard/new"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                New Note
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button> */}
            <Button variant="ghost" size="sm" className="gap-2" asChild>
              <Link href="/">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}