export class Toast {
  static container = document.getElementById('toast-container');

  static show(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
}
