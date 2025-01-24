interface Entry {
  id: string;
  name: string;
  website?: string;
  message: string;
  createdAt: Date;
}

class InMemoryStorage {
  private entries: Entry[] = [];

  addEntry(entry: Omit<Entry, 'id' | 'createdAt'>): Entry {
    const newEntry: Entry = {
      ...entry,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    this.entries.unshift(newEntry);
    return newEntry;
  }

  getEntries(): Entry[] {
    return this.entries;
  }

  deleteEntry(id: string): boolean {
    const initialLength = this.entries.length;
    this.entries = this.entries.filter(entry => entry.id !== id);
    return this.entries.length < initialLength;
  }
}

export const storage = new InMemoryStorage();

