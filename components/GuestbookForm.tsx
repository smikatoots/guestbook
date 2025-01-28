"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export default function GuestbookForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

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
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000) // Hide success message after 3 seconds
      // window.location.reload();
      setTimeout(function() {
        window.location.reload();
      }, 3000); 
    } catch (err) {
      console.error("Error submitting entry:", err)
      setError("Failed to submit entry. Please try again later.")
    }
  }

  return (
    <div className="relative isolate">
      {showSuccess && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md w-full sm:w-auto">
          <Alert className="bg-green-100 border-green-400 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>Awesome! Your entry was submitted successfully.</AlertDescription>
          </Alert>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="message" className="text-base font-medium">
            Your message
          </Label>
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
    </div>
  )
}

