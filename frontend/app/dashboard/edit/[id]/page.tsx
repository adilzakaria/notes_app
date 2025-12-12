"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const API_URL = "http://localhost:8080"

export default function EditNotePage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  // Load existing note
  useEffect(() => {
    async function fetchNote() {
      const token = localStorage.getItem("token")

      const res = await fetch(`${API_URL}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) return

      const data = await res.json()
      setTitle(data.data.title)
      setContent(data.data.content)
    }

    fetchNote()
  }, [id])

  // Handle update
  async function handleUpdate() {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    })

    if (res.ok) {
      router.push(`/notes/${id}`)
      router.refresh()
    } else {
      alert("Failed to update note")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        </div>
      </header>
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Note</h1>

      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          rows={12}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button onClick={handleUpdate}>Save Changes</Button>
      </div>
    </div>
    </div>
  )
}