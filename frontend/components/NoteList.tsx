"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// Mock data - replace with real data from your database
const notes = [
  {
    id: "1",
    title: "Meeting Notes",
    content: "Discussed project timeline and deliverables for Q1. Key points include...",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Recipe Ideas",
    content: "New recipes to try this week: pasta carbonara, chicken stir-fry...",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Book Summary",
    content: "Atomic Habits by James Clear - key takeaways and implementation strategies...",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Travel Plans",
    content: "Summer vacation planning - destinations, budget, and activities to research...",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "Code Snippets",
    content: "Useful React patterns and TypeScript utilities for future reference...",
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    title: "Fitness Goals",
    content: "Monthly fitness targets and workout routines to follow...",
    createdAt: "2024-01-10",
  },
]

export function NoteList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Link key={note.id} href={`/dashboard/note/${note.id}`}>
          <Card className="h-full transition-colors hover:bg-accent">
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg text-balance">{note.title}</CardTitle>
              </div>
              <CardDescription>{note.createdAt}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground text-pretty">{note.content}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
