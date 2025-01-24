import { NextResponse } from "next/server"
import { deleteEntry } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.json()
  const { id } = body

  try {
    const success = await deleteEntry(Number(id))
    if (success) {
      return NextResponse.json({ message: "Entry deleted successfully" })
    } else {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error in delete route:", error)
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 })
  }
}

