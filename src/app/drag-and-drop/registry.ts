
export class Registry<T> {

  private items = new Map<string, T>();

  constructor() { }

  register(id: string, item: T): void {
    if (this.has(id)) {
      console.error('Item name "' + id + '" already exists.');
      return;
    }
    this.items.set(id, item);
  }

  unregister(item: T): void {
    for (const [key, value] of Array.from(this.items)) {
      if (value === item) {
        this.items.delete(key);
        return;
      }
    }
  }

  get(id: string): T {
    return this.items.get(id);
  }

  has(id: string): boolean {
    return this.items.has(id);
  }
}
