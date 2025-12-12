"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Trash2 } from "lucide-react"

const API_URL = "http://localhost:8080"

export function NoteList() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      console.log('Notes data:', data); // Debug: check what data looks like
      setNotes(data.data || []);
    } catch (err) {
      console.error('Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/note/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchNotes(); // Refresh the list
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading notes...</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.length === 0 ? (
        <div className="col-span-full bg-white rounded-2xl shadow-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No notes yet. Create your first note!</p>
        </div>
      ) : (
        notes.map((note) => (
          <Link key={note.ID} href={`/dashboard/note/${note.ID}`}>
          <Card key={note.ID} className="hover:shadow-xl transition">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{note.Title || 'Untitled'}</CardTitle>
                <button
                  onClick={() => deleteNote(note.ID)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <CardDescription>
                {note.CreatedAt ? new Date(note.CreatedAt).toLocaleDateString() : 'No date'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 whitespace-pre-wrap">
                {note.Content || 'No content'}
              </p>
            </CardContent>
          </Card>
          </Link>
        ))
      )}
    </div>
  )
}