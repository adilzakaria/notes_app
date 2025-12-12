"use client"

import { useRouter } from "next/navigation"

const API_URL = "http://localhost:8080"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    const token = localStorage.getItem("token")

    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res.ok) {
      router.push("/dashboard")
      router.refresh()
    } else {
      alert("Failed to delete note")
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-white inline-flex items-center justify-center whitespace-nowrap rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground shadow-sm hover:bg-destructive/90"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete
    </button>
  )
}
