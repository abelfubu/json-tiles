import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  success(message: string): void {
    this.display(message, 'success')
  }

  error(message: string): void {
    this.display(message, 'error')
  }

  private display(message: string, type: 'success' | 'error'): void {
    document.querySelectorAll('.toast').forEach((toast) => toast.remove())
    const span = document.createElement('span')
    span.classList.add('toast', type)
    span.innerText = message
    document.body.appendChild(span)

    setTimeout(() => span.classList.add('fade-out'), 2700)
    setTimeout(span.remove.bind(span), 3000)
  }
}
