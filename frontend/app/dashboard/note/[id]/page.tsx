import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data - replace with real data from your database
const notes = {
    "1": {
        id: "1",
        title: "Meeting Notes",
        content: `Discussed project timeline and deliverables for Q1. Key points include:

- Launch date confirmed for March 15th
- Need to finalize design mockups by end of January
- Budget approved for additional resources
- Weekly sync meetings scheduled for Fridays at 2 PM

Action items:
1. Review and approve final designs
2. Set up development environment
3. Coordinate with marketing team for launch campaign

Next meeting scheduled for January 22nd.`,
        createdAt: "2024-01-15",
        category: "Work",
    },
    "2": {
        id: "2",
        title: "Recipe Ideas",
        content: `New recipes to try this week:

Pasta Carbonara:
- 400g spaghetti
- 200g pancetta
- 4 eggs
- 100g parmesan
- Black pepper

Chicken Stir-fry:
- 500g chicken breast
- Mixed vegetables
- Soy sauce, ginger, garlic
- Sesame oil

Shopping list created for weekend grocery run.`,
        createdAt: "2024-01-14",
        category: "Personal",
    },
}

export default async function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const note = notes[id as keyof typeof notes]

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
                                    Created on {note.createdAt} · {note.category}
                                </CardDescription>
                            </div>
                            <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
                                {note.category}
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
