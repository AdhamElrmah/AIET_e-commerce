import { Product, PRODUCTS_DATA } from '../models/Product.js';
import { ProductView } from '../views/ProductView.js';
import { eventBus } from '../utils/EventBus.js';

export class ProductController {
  constructor() {
    this.products = PRODUCTS_DATA.map(p => Product.fromData(p));
    this.view = new ProductView();
    this.activeCategory = 'All';
    this.searchQuery = '';
    
    this._bindEvents();
  }

  _bindEvents() {
    // Search
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this._filterProducts();
    });

    // Delegated events for products
    this.view.container.addEventListener('click', (e) => {
      // Category filter
      if (e.target.classList.contains('categories__btn')) {
        this.activeCategory = e.target.dataset.cat;
        document.querySelectorAll('.categories__btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this._filterProducts();
      }

      // Add to cart from grid
      if (e.target.closest('.product-card__add-btn')) {
        e.stopPropagation();
        const id = parseInt(e.target.closest('.product-card__add-btn').dataset.id);
        const product = this.products.find(p => p.id === id);
        eventBus.emit('cart:add', { product, quantity: 1 });
      }
      
      // View product details
      else if (e.target.closest('.product-card')) {
        const id = parseInt(e.target.closest('.product-card').dataset.id);
        this.showProductDetail(id);
      }

      // Detail page actions
      if (e.target.id === 'back-home-btn' || e.target.id === 'reset-search') {
        this.searchQuery = '';
        searchInput.value = '';
        this.showHome();
      }

      if (e.target.id === 'detail-inc') {
        const qtyEl = document.getElementById('detail-qty');
        qtyEl.textContent = parseInt(qtyEl.textContent) + 1;
      }
      
      if (e.target.id === 'detail-dec') {
        const qtyEl = document.getElementById('detail-qty');
        let val = parseInt(qtyEl.textContent);
        if (val > 1) qtyEl.textContent = val - 1;
      }

      if (e.target.id === 'detail-add-btn') {
        const id = parseInt(e.target.dataset.id);
        const qty = parseInt(document.getElementById('detail-qty').textContent);
        const product = this.products.find(p => p.id === id);
        eventBus.emit('cart:add', { product, quantity: qty });
      }
    });

    // Custom router event
    eventBus.on('route:home', () => this.showHome());
  }

  showHome() {
    this.view.renderHome(this.products, this.activeCategory);
  }

  showProductDetail(id) {
    const product = this.products.find(p => p.id === id);
    if (product) {
      this.view.renderProductDetail(product);
      window.scrollTo(0, 0);
    }
  }

  _filterProducts() {
    let filtered = this.products;
    
    if (this.activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === this.activeCategory);
    }
    
    if (this.searchQuery) {
      filtered = filtered.filter(p => p.matchesSearch(this.searchQuery));
    }
    
    this.view.renderProductGrid(filtered);
  }
}
