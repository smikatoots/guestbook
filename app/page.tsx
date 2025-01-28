import GuestbookForm from "../components/GuestbookForm"
import GuestbookFeed, { Entry } from "../components/GuestbookFeed"
import { getEntries } from "@/lib/db";

export default async function Home() {
  const entries = await getEntries() as Entry[];
  return (
    <div className="container mx-auto px-4 py-8 max-w-[800px]">
      <h1 className="text-4xl font-bold mb-8">Guestbook</h1>
      <GuestbookForm />
      <div className="mt-12">
        <GuestbookFeed entries={entries} />
      </div>
    </div>
  )
}

