import { NextResponse } from "next/server"
import { ensureTableExists } from "@/lib/db"

export async function GET() {
  try {
    await ensureTableExists()
    return NextResponse.json({ message: "Database setup completed successfully" })
  } catch (error) {
    console.error("Error in setup route:", error)
    return NextResponse.json({ error: "Failed to setup database" }, { status: 500 })
  }
}

