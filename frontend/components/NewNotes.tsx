"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

const API_URL = "http://localhost:8080"

export function NewNotes() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [token, setToken] = useState<string | null>(null)

  // Ambil JWT token dari localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) setToken(savedToken)
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const createNote = async () => {
    if (!title.trim()) return
    if (!token) {
      console.error("JWT token tidak ditemukan.")
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      })

      if (!res.ok) {
        console.error("Gagal membuat note:", await res.text())
        return
      }

      // Reset input
      setTitle("")
      setContent("")

      // Redirect ke dashboard
      router.push("/dashboard")

    } catch (err) {
      console.error("Error createNote:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createNote()
  }

  return (
    <div className="min-h-screen w-full max-w-2xl">
      <header className="border-b border-border">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
        </div>
      </header>
      <main className="min-h-screen w-full max-w-2xl">
        <Card >
          <CardHeader>
            <CardTitle className="text-2xl text-balance">Create New Note</CardTitle>
            <CardDescription>Add your note</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  placeholder="Enter note title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  placeholder="Note content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  Create Note
                </Button>
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard")} disabled={isLoading}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

    </div>
  )
}
