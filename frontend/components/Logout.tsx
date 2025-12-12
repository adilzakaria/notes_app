"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/logout", {
      method: "POST",
    })

    router.push("/") // Redirect ke halaman login / landing page
  }

  return (
    <Button variant="ghost" size="sm" className="gap-2" onClick={handleLogout}>
      <LogOut className="h-4 w-4" />
      <span className="hidden sm:inline">Logout</span>
    </Button>
  )
}
