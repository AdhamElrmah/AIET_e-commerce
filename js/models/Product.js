/**
 * Product Model — Represents a product entity
 * Demonstrates: Encapsulation, static methods
 */
export class Product {
  #id; #name; #price; #oldPrice; #category; #description; #icon; #rating; #features;

  constructor({ id, name, price, oldPrice, category, description, icon, rating, features }) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#oldPrice = oldPrice || null;
    this.#category = category;
    this.#description = description;
    this.#icon = icon;
    this.#rating = rating || 4;
    this.#features = features || [];
  }

  // Getters — Encapsulation
  get id() { return this.#id; }
  get name() { return this.#name; }
  get price() { return this.#price; }
  get oldPrice() { return this.#oldPrice; }
  get category() { return this.#category; }
  get description() { return this.#description; }
  get icon() { return this.#icon; }
  get rating() { return this.#rating; }
  get features() { return [...this.#features]; }

  get discount() {
    if (!this.#oldPrice) return 0;
    return Math.round((1 - this.#price / this.#oldPrice) * 100);
  }

  get formattedPrice() { return `$${this.#price.toFixed(2)}`; }
  get formattedOldPrice() { return this.#oldPrice ? `$${this.#oldPrice.toFixed(2)}` : ''; }

  matchesSearch(query) {
    const q = query.toLowerCase();
    return this.#name.toLowerCase().includes(q) || this.#description.toLowerCase().includes(q);
  }

  toJSON() {
    return { id: this.#id, name: this.#name, price: this.#price, oldPrice: this.#oldPrice, category: this.#category, description: this.#description, icon: this.#icon, rating: this.#rating, features: this.#features };
  }

  /** Factory — creates Product instances from raw data */
  static fromData(data) {
    return new Product(data);
  }
}

/** Seed product data */
export const PRODUCTS_DATA = [
  { id: 1, name: 'Wireless Headphones', price: 79.99, oldPrice: 129.99, category: 'Audio', description: 'Premium noise-cancelling wireless headphones with 30h battery life.', icon: '🎧', rating: 5, features: ['Noise Cancelling', '30h Battery', 'Bluetooth 5.2'] },
  { id: 2, name: 'Smart Watch Pro', price: 249.99, oldPrice: 299.99, category: 'Wearables', description: 'Advanced fitness tracking, heart rate monitoring, and GPS.', icon: '⌚', rating: 4, features: ['Heart Rate', 'GPS', 'Water Resistant'] },
  { id: 3, name: 'Mechanical Keyboard', price: 119.99, oldPrice: null, category: 'Peripherals', description: 'RGB mechanical keyboard with hot-swappable switches.', icon: '⌨️', rating: 5, features: ['Hot-Swap', 'RGB Backlit', 'USB-C'] },
  { id: 4, name: 'Portable Speaker', price: 49.99, oldPrice: 69.99, category: 'Audio', description: 'Waterproof Bluetooth speaker with 360° sound.', icon: '🔊', rating: 4, features: ['Waterproof', '12h Battery', '360° Sound'] },
  { id: 5, name: 'USB-C Hub', price: 39.99, oldPrice: null, category: 'Peripherals', description: '7-in-1 USB-C hub with HDMI, SD card, and USB 3.0 ports.', icon: '🔌', rating: 4, features: ['7-in-1', 'HDMI 4K', 'USB 3.0'] },
  { id: 6, name: 'Fitness Tracker', price: 59.99, oldPrice: 89.99, category: 'Wearables', description: 'Slim fitness band with sleep tracking and notifications.', icon: '📟', rating: 3, features: ['Sleep Tracking', 'Notifications', '7-Day Battery'] },
  { id: 7, name: 'Webcam HD', price: 69.99, oldPrice: null, category: 'Peripherals', description: '1080p webcam with auto-focus and built-in mic.', icon: '📷', rating: 4, features: ['1080p', 'Auto Focus', 'Built-in Mic'] },
  { id: 8, name: 'Noise Cancelling Earbuds', price: 99.99, oldPrice: 149.99, category: 'Audio', description: 'True wireless earbuds with ANC and transparency mode.', icon: '🎵', rating: 5, features: ['ANC', 'Transparency Mode', '24h Battery'] },
  { id: 9, name: 'Gaming Mouse', price: 54.99, oldPrice: null, category: 'Peripherals', description: 'Lightweight gaming mouse with 16K DPI sensor.', icon: '🖱️', rating: 4, features: ['16K DPI', 'Lightweight', 'RGB'] },
  { id: 10, name: 'Smart Band', price: 34.99, oldPrice: 49.99, category: 'Wearables', description: 'Affordable smart band with heart rate and step tracking.', icon: '💪', rating: 3, features: ['Heart Rate', 'Step Counter', 'IP68'] },
  { id: 11, name: 'Desk Lamp LED', price: 44.99, oldPrice: null, category: 'Accessories', description: 'Adjustable LED desk lamp with multiple brightness levels.', icon: '💡', rating: 4, features: ['Adjustable', 'Eye-Care', 'USB Charging'] },
  { id: 12, name: 'Laptop Stand', price: 29.99, oldPrice: 39.99, category: 'Accessories', description: 'Ergonomic aluminum laptop stand for better posture.', icon: '💻', rating: 5, features: ['Aluminum', 'Foldable', 'Anti-Slip'] },
];
