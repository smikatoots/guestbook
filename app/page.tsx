"use client"

import { useState } from "react"
import GuestbookForm from "../components/GuestbookForm"
import GuestbookFeed from "../components/GuestbookFeed"

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleEntryAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[800px]">
      <h1 className="text-4xl font-bold mb-8">Guestbook</h1>
      <GuestbookForm onEntryAdded={handleEntryAdded} />
      <div className="mt-12">
        <GuestbookFeed refreshTrigger={refreshTrigger} />
      </div>
    </div>
  )
}

