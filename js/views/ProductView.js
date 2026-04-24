export class ProductView {
  constructor() {
    this.container = document.getElementById('main-content');
  }

  /** Render the home page with hero, categories, and products grid */
  renderHome(products, activeCategory = 'All') {
    const categories = ['All', ...new Set(products.map(p => p.category))];
    
    this.container.innerHTML = `
      <section class="hero fade-in">
        <span class="hero__tag">NEW COLLECTION</span>
        <h1 class="hero__title">Discover <span>Premium</span> Gear</h1>
        <p class="hero__subtitle">Elevate your digital lifestyle with our curated selection of top-tier electronics and accessories.</p>
      </section>
      
      <div class="categories fade-in" style="animation-delay: 0.1s">
        ${categories.map(c => `<button class="categories__btn ${c === activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}
      </div>
      
      <div class="product-grid fade-in" style="animation-delay: 0.2s" id="product-grid-container">
        <!-- Products injected here -->
      </div>
    `;

    this.renderProductGrid(products);
  }

  /** Render just the product grid (useful for filtering/searching) */
  renderProductGrid(products) {
    const gridContainer = document.getElementById('product-grid-container');
    if (!gridContainer) return; // Not on home page

    if (products.length === 0) {
      gridContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1/-1">
          <div class="empty-state__icon">🔍</div>
          <h3 class="empty-state__title">No products found</h3>
          <p class="empty-state__text">Try adjusting your search or category filter.</p>
          <button class="btn btn--primary" id="reset-search">View All Products</button>
        </div>
      `;
      return;
    }

    gridContainer.innerHTML = products.map(p => `
      <div class="product-card" data-id="${p.id}">
        ${p.discount > 0 ? `<div class="product-card__badge">-${p.discount}%</div>` : ''}
        <div class="product-card__image">
          <div class="product-card__image-bg"></div>
          ${p.icon}
        </div>
        <div class="product-card__body">
          <div class="product-card__category">${p.category}</div>
          <h3 class="product-card__name">${p.name}</h3>
          <p class="product-card__desc">${p.description}</p>
          <div class="product-card__footer">
            <div>
              <span class="product-card__price">${p.formattedPrice}</span>
              ${p.oldPrice ? `<span class="product-card__price-old">${p.formattedOldPrice}</span>` : ''}
            </div>
            <button class="product-card__add-btn" data-id="${p.id}" aria-label="Add to cart">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  /** Render single product detail page */
  renderProductDetail(product) {
    this.container.innerHTML = `
      <div class="fade-in">
        <button class="back-btn" id="back-home-btn">← Back to Shop</button>
        <div class="product-detail">
          <div class="product-detail__image">
            ${product.icon}
          </div>
          <div class="product-detail__info">
            <div class="product-detail__category">${product.category}</div>
            <h1 class="product-detail__name">${product.name}</h1>
            
            <div class="stars">
              ${Array.from({ length: 5 }, (_, i) => `<span class="stars__star ${i < product.rating ? '' : 'stars__star--empty'}">★</span>`).join('')}
            </div>
            
            <div>
              <span class="product-detail__price">${product.formattedPrice}</span>
              ${product.oldPrice ? `<span class="product-detail__price-old">${product.formattedOldPrice}</span>` : ''}
            </div>
            
            <p class="product-detail__desc">${product.description}</p>
            
            <div class="product-detail__features">
              ${product.features.map(f => `
                <div class="product-detail__feature">
                  <span class="product-detail__feature-icon">✓</span> ${f}
                </div>
              `).join('')}
            </div>
            
            <div class="product-detail__actions">
              <div class="product-detail__qty">
                <button class="product-detail__qty-btn" id="detail-dec">-</button>
                <span class="product-detail__qty-val" id="detail-qty">1</span>
                <button class="product-detail__qty-btn" id="detail-inc">+</button>
              </div>
              <button class="btn btn--primary" id="detail-add-btn" data-id="${product.id}" style="flex: 1">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
