export class CartView {
  constructor() {
    this.overlay = document.getElementById('cart-overlay');
    this.sidebar = document.getElementById('cart-sidebar');
    this.body = document.getElementById('cart-sidebar-body');
    this.footer = document.getElementById('cart-sidebar-footer');
    this.badge = document.getElementById('cart-badge');
  }

  toggleCart(forceOpen) {
    const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !this.sidebar.classList.contains('open');
    if (isOpen) {
      this.overlay.classList.add('open');
      this.sidebar.classList.add('open');
    } else {
      this.overlay.classList.remove('open');
      this.sidebar.classList.remove('open');
    }
  }

  updateBadge(count) {
    this.badge.textContent = count;
    if (count > 0) this.badge.classList.add('visible');
    else this.badge.classList.remove('visible');
  }

  renderCart(cart) {
    this.updateBadge(cart.count);

    if (cart.items.length === 0) {
      this.body.innerHTML = `
        <div class="cart-sidebar__empty">
          <div class="cart-sidebar__empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started.</p>
        </div>
      `;
      this.footer.innerHTML = '';
      return;
    }

    this.body.innerHTML = cart.items.map(item => `
      <div class="cart-item">
        <div class="cart-item__image">${item.icon}</div>
        <div class="cart-item__info">
          <div class="cart-item__name">${item.name}</div>
          <div class="cart-item__price">$${item.price.toFixed(2)}</div>
          <div class="cart-item__actions">
            <button class="cart-item__qty-btn" data-action="dec" data-id="${item.productId}">-</button>
            <span class="cart-item__qty">${item.quantity}</span>
            <button class="cart-item__qty-btn" data-action="inc" data-id="${item.productId}">+</button>
            <button class="cart-item__remove" data-action="remove" data-id="${item.productId}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    this.footer.innerHTML = `
      <div class="cart-summary">
        <div class="cart-summary__row">
          <span>Subtotal</span>
          <span>$${cart.subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-summary__row">
          <span>Shipping</span>
          <span>${cart.shipping === 0 ? 'Free' : '$' + cart.shipping.toFixed(2)}</span>
        </div>
        <div class="cart-summary__row cart-summary__row--total">
          <span>Total</span>
          <span>$${cart.total.toFixed(2)}</span>
        </div>
        <button class="btn btn--primary btn--full" id="checkout-btn" style="margin-top: 12px">Checkout</button>
      </div>
    `;
  }
}
