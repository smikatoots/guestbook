"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Entry {
  id: number
  name: string
  website?: string
  message: string
}

interface GuestbookFeedProps {
  refreshTrigger: number
}

export default function GuestbookFeed({ refreshTrigger }: GuestbookFeedProps) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEntries()
  }, [refreshTrigger])

  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/entries")
      if (!res.ok) {
        throw new Error("Failed to fetch entries")
      }
      const data = await res.json()
      setEntries(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching entries:", err)
      setError("Failed to load entries. Please try again later.")
    }
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="space-y-4">
      {entries.map((entry: Entry) => (
        <Card key={entry.id}>
          <CardContent className="p-4">
            <h3 className="font-bold text-base">
              {entry.website ? (
                <a
                  href={entry.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {entry.name}
                </a>
              ) : (
                entry.name
              )}
            </h3>
            <p className="text-gray-600 text-base">{entry.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

