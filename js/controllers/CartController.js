import { Cart } from '../models/Cart.js';
import { CartView } from '../views/CartView.js';
import { eventBus } from '../utils/EventBus.js';
import { Toast } from '../utils/Toast.js';

export class CartController {
  constructor() {
    this.cart = Cart.getInstance();
    this.view = new CartView();
    
    this._bindEvents();
    this._init();
  }

  _init() {
    this.view.renderCart(this.cart);
  }

  _bindEvents() {
    // Navbar cart toggle
    document.getElementById('cart-btn').addEventListener('click', () => {
      this.view.toggleCart();
    });

    // Close button & overlay
    document.getElementById('cart-close').addEventListener('click', () => this.view.toggleCart(false));
    document.getElementById('cart-overlay').addEventListener('click', () => this.view.toggleCart(false));

    // Cart actions (delegated)
    this.view.sidebar.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const action = btn.dataset.action;
      const id = parseInt(btn.dataset.id);

      if (action === 'inc') {
        const item = this.cart.items.find(i => i.productId === id);
        this.cart.updateQuantity(id, item.quantity + 1);
      } 
      else if (action === 'dec') {
        const item = this.cart.items.find(i => i.productId === id);
        this.cart.updateQuantity(id, item.quantity - 1);
      }
      else if (action === 'remove') {
        this.cart.removeItem(id);
        Toast.show('Item removed from cart', 'info');
      }
      else if (btn.id === 'checkout-btn') {
        this.view.toggleCart(false);
        eventBus.emit('route:checkout');
      }
    });

    // Event bus listeners
    eventBus.on('cart:add', ({ product, quantity }) => {
      this.cart.addItem(product, quantity);
      this.view.toggleCart(true);
      Toast.show(`${product.name} added to cart`, 'success');
    });

    eventBus.on('cart:updated', () => {
      this.view.renderCart(this.cart);
    });
  }
}
