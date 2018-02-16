
export class Registry<T> {

  private items = new Map<string, T>();

  constructor() { }

  register(name: string, item: T): void {
    if (this.items.has(name)) {
      console.error('Item name "' + name + '" already exists.');
      return;
    }
    this.items.set(name, item);
  }

  unregister(item: T): void {
    for (const [key, value] of Array.from(this.items)) {
      if (value === item) {
        this.items.delete(key);
        return;
      }
    }
  }

  get(name: string): T {
    return this.items.get(name);
  }
}
