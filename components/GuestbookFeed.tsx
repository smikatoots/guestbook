import { Card, CardContent } from "@/components/ui/card"

export interface Entry {
  id: number
  name: string
  website?: string
  message: string
}

interface GuestbookFeedProps {
  entries: Entry[];
}

export default function GuestbookFeed({ entries }: GuestbookFeedProps) {
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

