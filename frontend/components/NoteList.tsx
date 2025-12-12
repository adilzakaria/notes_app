"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const API_URL = "http://localhost:8080"

export function NoteList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setLoading(false)
      return
    }

    fetch(`${API_URL}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json()
        console.log("DEBUG RESPONSE:", data)

        let list = []

        if (Array.isArray(data)) {
          list = data
        } else if (data.data) {
          list = data.data
        } else if (data.notes) {
          list = data.notes
        }

        setNotes(list)
      })
      .catch((err) => console.error("Error:", err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Link key={note.id} href={`/dashboard/note/${note.id}`}>
          <Card className="h-full transition-colors hover:bg-accent">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg text-balance">{note.title}</CardTitle>
              </div>
              <CardDescription>
                {note.created_at?.slice(0, 10) || "-"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground text-pretty">
                {note.content}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}