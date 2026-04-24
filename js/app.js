/**
 * NovaMart — Main Application Entry Point
 * Orchestrates all MVC controllers and acts as a simple router
 */

import { ProductController } from './controllers/ProductController.js';
import { CartController } from './controllers/CartController.js';
import { AuthController } from './controllers/AuthController.js';
import { CheckoutController } from './controllers/CheckoutController.js';
import { eventBus } from './utils/EventBus.js';

class App {
  constructor() {
    // Initialize MVC Controllers
    this.productController = new ProductController();
    this.cartController = new CartController();
    this.authController = new AuthController();
    this.checkoutController = new CheckoutController();

    this._bindRouting();
    
    // Initial Route
    eventBus.emit('route:home');
  }

  _bindRouting() {
    document.getElementById('logo-link').addEventListener('click', (e) => {
      e.preventDefault();
      eventBus.emit('route:home');
    });
  }
}

// Bootstrap App
document.addEventListener('DOMContentLoaded', () => {
  window.novaApp = new App();
});
