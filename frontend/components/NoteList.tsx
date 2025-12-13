"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const API_URL = "http://localhost:8080"

export function NoteList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) setToken(savedToken)
    else setLoading(false)
  }, [])

  useEffect(() => {
    if (token) fetchNotes()
  }, [token])

  const fetchNotes = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/notes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        console.error("Unauthorized or failed to fetch notes")
        setNotes([])
        return
      }

      const data = await res.json()
      setNotes(Array.isArray(data.data) ? data.data : [])
    } catch (err) {
      console.error("Error fetching notes:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading notes...</div>
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length === 0 ? (
        <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            No notes yet. Create your first note!
          </p>
        </div>
      ) : (
        notes.map((note) => {
          const preview =
            note.Content?.length > 150
              ? note.Content.slice(0, 150) + "..."
              : note.Content

          return (
            <Link key={note.ID} href={`/dashboard/note/${note.ID}`}>
              <Card className="hover:shadow-xl transition">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {note.Title || "Untitled"}
                  </CardTitle>
                  <CardDescription>
                    {note.CreatedAt
                      ? new Date(note.CreatedAt).toLocaleDateString()
                      : "-"}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {preview || "No content"}
                  </p>
                  <div className="text-sm text-gray-400 mt-4">
                    {note.Content &&
                      `Words: ${note.Content.split(/\s+/).length}`}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })
      )}
    </div>
  )
}