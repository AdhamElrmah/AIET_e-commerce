export class AuthView {
  constructor() {
    this.container = document.getElementById('main-content');
    this.authLabel = document.getElementById('auth-label');
  }

  updateAuthNav(user) {
    this.authLabel.textContent = user ? user.name.split(' ')[0] : 'Sign In';
  }

  renderAuthPage(isLogin = true) {
    this.container.innerHTML = `
      <div class="auth-page fade-in">
        <div class="auth-card">
          <h1 class="auth-card__title">${isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p class="auth-card__subtitle">${isLogin ? 'Sign in to access your account' : 'Join us to get the best deals'}</p>
          
          <form class="auth-form" id="auth-form" data-type="${isLogin ? 'login' : 'register'}">
            ${!isLogin ? `
              <div class="form-group">
                <label class="form-group__label" for="auth-name">Full Name</label>
                <input type="text" id="auth-name" class="form-group__input" required placeholder="John Doe" />
              </div>
            ` : ''}
            
            <div class="form-group">
              <label class="form-group__label" for="auth-email">Email Address</label>
              <input type="email" id="auth-email" class="form-group__input" required placeholder="john@example.com" />
            </div>
            
            <div class="form-group">
              <label class="form-group__label" for="auth-password">Password</label>
              <input type="password" id="auth-password" class="form-group__input" required placeholder="••••••••" />
              <div class="form-group__error" id="auth-error"></div>
            </div>
            
            <button type="submit" class="btn btn--primary btn--full">${isLogin ? 'Sign In' : 'Sign Up'}</button>
          </form>
          
          <div class="auth-card__toggle">
            ${isLogin ? 'Don\'t have an account? <a id="toggle-auth">Sign Up</a>' : 'Already have an account? <a id="toggle-auth">Sign In</a>'}
          </div>
        </div>
      </div>
    `;
  }

  renderProfile(user) {
    this.container.innerHTML = `
      <div class="auth-page fade-in">
        <div class="auth-card">
          <div style="font-size: 3rem; margin-bottom: 16px;">👤</div>
          <h1 class="auth-card__title">Hello, ${user.name}</h1>
          <p class="auth-card__subtitle">${user.email}</p>
          
          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 32px">
            <button class="btn btn--outline btn--full" id="orders-btn">My Orders</button>
            <button class="btn btn--danger btn--full" id="logout-btn">Log Out</button>
          </div>
        </div>
      </div>
    `;
  }
}
