/**
 * Cart Model — Singleton pattern for managing shopping cart
 * Demonstrates: Singleton, Encapsulation, Composition (CartItem)
 */
import { Storage } from '../utils/Storage.js';
import { eventBus } from '../utils/EventBus.js';

/** CartItem — composed inside Cart */
class CartItem {
  constructor(product, quantity = 1) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.icon = product.icon;
    this.quantity = quantity;
  }

  get total() {
    return this.price * this.quantity;
  }
}

export class Cart {
  static #instance = null;
  #items = [];

  constructor() {
    if (Cart.#instance) return Cart.#instance;
    this.#items = this.#loadFromStorage();
    Cart.#instance = this;
  }

  /** Singleton accessor */
  static getInstance() {
    if (!Cart.#instance) new Cart();
    return Cart.#instance;
  }

  get items() { return [...this.#items]; }
  get count() { return this.#items.reduce((sum, i) => sum + i.quantity, 0); }
  get subtotal() { return this.#items.reduce((sum, i) => sum + i.total, 0); }
  get shipping() { return this.subtotal > 100 ? 0 : 9.99; }
  get total() { return this.subtotal + this.shipping; }

  addItem(product, qty = 1) {
    const existing = this.#items.find(i => i.productId === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      this.#items.push(new CartItem(product, qty));
    }
    this.#save();
  }

  removeItem(productId) {
    this.#items = this.#items.filter(i => i.productId !== productId);
    this.#save();
  }

  updateQuantity(productId, qty) {
    const item = this.#items.find(i => i.productId === productId);
    if (!item) return;
    if (qty <= 0) { this.removeItem(productId); return; }
    item.quantity = qty;
    this.#save();
  }

  clear() {
    this.#items = [];
    this.#save();
  }

  #save() {
    Storage.set('cart', this.#items.map(i => ({ productId: i.productId, name: i.name, price: i.price, icon: i.icon, quantity: i.quantity })));
    eventBus.emit('cart:updated', { count: this.count, total: this.total });
  }

  #loadFromStorage() {
    const data = Storage.get('cart', []);
    return data.map(d => Object.assign(new CartItem({ id: d.productId, name: d.name, price: d.price, icon: d.icon }), { quantity: d.quantity }));
  }
}
