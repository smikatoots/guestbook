"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface GuestbookFormProps {
  onEntryAdded: () => void
}

export default function GuestbookForm({ onEntryAdded }: GuestbookFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, website, message }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit entry")
      }

      setName("")
      setEmail("")
      setWebsite("")
      setMessage("")
      onEntryAdded()
    } catch (err) {
      console.error("Error submitting entry:", err)
      setError("Failed to submit entry. Please try again later.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="message" className="text-base font-medium">
          Your message
        </Label>
        <p className="text-sm text-gray-500 mb-2">Your message</p>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mika, you are so awesome and I wanted to share that with you!"
          required
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="name" className="text-base font-medium">
          First & last name
        </Label>
        <p className="text-sm text-gray-500 mb-2">First & last name</p>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mikaela Reyes"
          required
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-base font-medium">
          Email
        </Label>
        <p className="text-sm text-gray-500 mb-2">{`So I can thank you! This won't be shown publicly.`}</p>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full"
        />
      </div>
      <div>
        <Label htmlFor="website" className="text-base font-medium">
          Website (optional)
        </Label>
        <p className="text-sm text-gray-500 mb-2">Website (optional)</p>
        <Input
          id="website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://mikareyes.com"
          className="w-full"
        />
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <Button type="submit" className="w-full text-base py-6">
        Submit
      </Button>
    </form>
  )
}

