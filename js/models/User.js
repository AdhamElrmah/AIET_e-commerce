/**
 * User Model — Simulates authentication with localStorage
 * Demonstrates: Encapsulation, static factory
 */
import { Storage } from '../utils/Storage.js';
import { eventBus } from '../utils/EventBus.js';

export class User {
  #name; #email; #loggedIn;

  constructor(name, email) {
    this.#name = name;
    this.#email = email;
    this.#loggedIn = true;
  }

  get name() { return this.#name; }
  get email() { return this.#email; }
  get isLoggedIn() { return this.#loggedIn; }

  /** Simulate registration */
  static register(name, email, password) {
    const users = Storage.get('users', []);
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }
    users.push({ name, email, password });
    Storage.set('users', users);
    const user = new User(name, email);
    Storage.set('currentUser', { name, email });
    eventBus.emit('auth:changed', user);
    return { success: true, user };
  }

  /** Simulate login */
  static login(email, password) {
    const users = Storage.get('users', []);
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      return { success: false, message: 'Invalid email or password.' };
    }
    const user = new User(found.name, found.email);
    Storage.set('currentUser', { name: found.name, email: found.email });
    eventBus.emit('auth:changed', user);
    return { success: true, user };
  }

  static logout() {
    Storage.remove('currentUser');
    eventBus.emit('auth:changed', null);
  }

  /** Restore session from storage */
  static restore() {
    const data = Storage.get('currentUser');
    if (data) return new User(data.name, data.email);
    return null;
  }
}
