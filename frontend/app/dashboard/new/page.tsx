import { NewNotes as NewNotesComponent } from "@/components/NewNotes"

export default function NewNotes() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
            <NewNotesComponent />
        </div>
    )
}