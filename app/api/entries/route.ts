import { NextResponse } from "next/server"
import { getEntries } from "@/lib/db"

export async function GET() {
  try {
    const entries = await getEntries()
    return NextResponse.json(entries)
  } catch (error) {
    console.error("Error in entries route:", error)
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 })
  }
}

