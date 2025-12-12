import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

const API_URL = "http://localhost:8080"

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  // --- Fetch note by ID ---
  async function getNote() {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

    const res = await fetch(`${API_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.data
  }

  const note = await getNote()

  if (!note) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Note not found</p>
      </div>
    )
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
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl text-balance">{note.title}</CardTitle>
                <CardDescription className="mt-2">
                  Created on {note.created_at?.slice(0, 10) || "-"} · Notes
                </CardDescription>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                Notes
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-pretty leading-relaxed">{note.content}</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
