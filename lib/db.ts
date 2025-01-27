import { sql } from "@vercel/postgres"

export async function ensureTableExists() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS guestbook (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        website VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `
    console.log("Table checked/created successfully")
  } catch (error) {
    console.error("Error checking/creating table:", error)
    throw error
  }
}

export async function addEntry({
  name,
  email,
  website,
  message,
}: { name: string; email: string; website?: string; message: string }) {
  await ensureTableExists()
  try {
    const result = await sql`
      INSERT INTO guestbook (name, email, website, message)
      VALUES (${name}, ${email}, ${website}, ${message})
      RETURNING *;
    `
    console.log("Entry added")
    return result.rows[0]
  } catch (error) {
    console.error("Error adding entry:", error)
    throw error
  }
}

export async function getEntries() {
  await ensureTableExists()
  try {
    const result = await sql`
      SELECT * FROM guestbook
      ORDER BY created_at DESC;
    `
    console.log("Entries loaded")
    return result.rows
  } catch (error) {
    console.error("Error fetching entries:", error)
    throw error
  }
}

export async function deleteEntry(id: number) {
  await ensureTableExists()
  try {
    const result = await sql`
      DELETE FROM guestbook
      WHERE id = ${id}
      RETURNING *;
    `
    const rowCount = result.rowCount ?? 0;
    return rowCount > 0
  } catch (error) {
    console.error("Error deleting entry:", error)
    throw error
  }
}

