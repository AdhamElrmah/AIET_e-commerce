import { Cart } from '../models/Cart.js';
import { User } from '../models/User.js';
import { CheckoutView } from '../views/CheckoutView.js';
import { eventBus } from '../utils/EventBus.js';
import { Toast } from '../utils/Toast.js';

export class CheckoutController {
  constructor() {
    this.view = new CheckoutView();
    this.cart = Cart.getInstance();
    
    this._bindEvents();
  }

  _bindEvents() {
    eventBus.on('route:checkout', () => this.showCheckout());

    this.view.container.addEventListener('click', (e) => {
      if (e.target.id === 'checkout-back-shop' || e.target.id === 'success-back-shop') {
        eventBus.emit('route:home');
      }
      if (e.target.id === 'place-order-btn') {
        this._processOrder();
      }
    });
  }

  showCheckout() {
    const user = User.restore();
    if (!user) {
      Toast.show('Please sign in to checkout', 'info');
      eventBus.emit('route:auth');
      return;
    }
    
    this.view.renderCheckout(this.cart);
    window.scrollTo(0, 0);
  }

  _processOrder() {
    const inputs = this.view.container.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = 'var(--clr-danger)';
        isValid = false;
      } else {
        input.style.borderColor = 'var(--clr-border)';
      }
    });

    if (!isValid) {
      Toast.show('Please fill in all required fields', 'error');
      return;
    }

    // Simulate API call
    const btn = document.getElementById('place-order-btn');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
      this.cart.clear();
      this.view.renderSuccess();
      window.scrollTo(0, 0);
    }, 1500);
  }
}
