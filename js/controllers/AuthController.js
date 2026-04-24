import { User } from '../models/User.js';
import { AuthView } from '../views/AuthView.js';
import { eventBus } from '../utils/EventBus.js';
import { Toast } from '../utils/Toast.js';

export class AuthController {
  constructor() {
    this.user = User.restore();
    this.view = new AuthView();
    this.isLoginMode = true;
    
    this._init();
    this._bindEvents();
  }

  _init() {
    this.view.updateAuthNav(this.user);
  }

  _bindEvents() {
    document.getElementById('auth-btn').addEventListener('click', () => {
      eventBus.emit('route:auth');
    });

    this.view.container.addEventListener('click', (e) => {
      if (e.target.id === 'toggle-auth') {
        this.isLoginMode = !this.isLoginMode;
        this.view.renderAuthPage(this.isLoginMode);
      }
      if (e.target.id === 'logout-btn') {
        User.logout();
        Toast.show('Logged out successfully', 'info');
        eventBus.emit('route:home');
      }
    });

    this.view.container.addEventListener('submit', (e) => {
      if (e.target.id === 'auth-form') {
        e.preventDefault();
        this._handleAuthSubmit();
      }
    });

    eventBus.on('route:auth', () => this.showAuthPage());
    
    eventBus.on('auth:changed', (user) => {
      this.user = user;
      this.view.updateAuthNav(user);
    });
  }

  showAuthPage() {
    if (this.user) {
      this.view.renderProfile(this.user);
    } else {
      this.view.renderAuthPage(this.isLoginMode);
    }
  }

  _handleAuthSubmit() {
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    const errorEl = document.getElementById('auth-error');
    
    let result;

    if (this.isLoginMode) {
      result = User.login(email, password);
    } else {
      const name = document.getElementById('auth-name').value;
      result = User.register(name, email, password);
    }

    if (result.success) {
      Toast.show(this.isLoginMode ? 'Welcome back!' : 'Account created!', 'success');
      eventBus.emit('route:home');
    } else {
      errorEl.textContent = result.message;
      errorEl.classList.add('visible');
    }
  }
}
