export class CheckoutView {
  constructor() {
    this.container = document.getElementById('main-content');
  }

  renderCheckout(cart) {
    if (cart.items.length === 0) {
      this.container.innerHTML = `
        <div class="empty-state fade-in">
          <div class="empty-state__icon">🛒</div>
          <h3 class="empty-state__title">Your cart is empty</h3>
          <p class="empty-state__text">Add some products before checking out.</p>
          <button class="btn btn--primary" id="checkout-back-shop">Browse Products</button>
        </div>
      `;
      return;
    }

    this.container.innerHTML = `
      <div class="checkout-page fade-in">
        <div class="checkout-form">
          <div class="checkout-section">
            <h2 class="checkout-section__title">Contact Information</h2>
            <div class="form-group">
              <label class="form-group__label">Email Address</label>
              <input type="email" class="form-group__input" required placeholder="john@example.com" />
            </div>
          </div>
          
          <div class="checkout-section">
            <h2 class="checkout-section__title">Shipping Address</h2>
            <div class="form-row">
              <div class="form-group">
                <label class="form-group__label">First Name</label>
                <input type="text" class="form-group__input" required />
              </div>
              <div class="form-group">
                <label class="form-group__label">Last Name</label>
                <input type="text" class="form-group__input" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-group__label">Address</label>
              <input type="text" class="form-group__input" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-group__label">City</label>
                <input type="text" class="form-group__input" required />
              </div>
              <div class="form-group">
                <label class="form-group__label">Postal Code</label>
                <input type="text" class="form-group__input" required />
              </div>
            </div>
          </div>
          
          <div class="checkout-section">
            <h2 class="checkout-section__title">Payment Method</h2>
            <div class="form-group">
              <label class="form-group__label">Card Number</label>
              <input type="text" class="form-group__input" placeholder="0000 0000 0000 0000" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-group__label">Expiry Date</label>
                <input type="text" class="form-group__input" placeholder="MM/YY" />
              </div>
              <div class="form-group">
                <label class="form-group__label">CVC</label>
                <input type="text" class="form-group__input" placeholder="123" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="checkout-order">
          <h2 class="checkout-order__title">Order Summary</h2>
          <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
            ${cart.items.map(item => `
              <div class="checkout-order__item">
                <span class="checkout-order__item-name">${item.quantity}x ${item.name}</span>
                <span>$${item.total.toFixed(2)}</span>
              </div>
            `).join('')}
          </div>
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
          </div>
          <button class="btn btn--primary btn--full" id="place-order-btn" style="margin-top:24px;">Place Order</button>
        </div>
      </div>
    `;
  }

  renderSuccess() {
    this.container.innerHTML = `
      <div class="success-page fade-in">
        <div class="success-page__icon">🎉</div>
        <h1 class="success-page__title">Order Confirmed!</h1>
        <p class="success-page__text">Thank you for shopping with NovaMart. Your order has been placed successfully.</p>
        <button class="btn btn--primary" id="success-back-shop">Continue Shopping</button>
      </div>
    `;
  }
}
