import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { title, content } = await req.json()

  // VALIDATION
  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  // Simpan ke database — ganti sesuai DB kamu
  console.log("Saving note:", { title, content })

  return NextResponse.json({ message: "Note created" }, { status: 201 })
}
