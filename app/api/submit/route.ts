import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { addEntry } from "@/lib/db"

export async function POST(req: Request) {
  const body = await req.json()
  const { name, website, email, message } = body

  try {
    const entry = await addEntry({ name, website, email, message })
    revalidatePath('/');
    return NextResponse.json(entry, { status: 201 })
  } catch (error) {
    console.error("Error in submit route:", error)
    return NextResponse.json({ error: "Failed to submit entry" }, { status: 500 })
  }
}

