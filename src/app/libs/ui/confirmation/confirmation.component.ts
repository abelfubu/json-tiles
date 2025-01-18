import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog'
import { Component, inject } from '@angular/core'
import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'wbf-confirmation',
  imports: [ButtonComponent],
  template: `
    <p>{{ data }}</p>
    <div class="actions">
      <button wbf-button (click)="dialogRef.close(false)">CANCEL</button>
      <button wbf-button (click)="dialogRef.close(true)">OK</button>
    </div>
  `,
  styles: `
    :host {
      display: block;
      padding: 1rem 2rem 2rem;
      background: #fff;
      border-radius: 0.2rem;
      box-shadow: 0 0 10px 0 light-dark(#0001, #0005);
    }

    p {
      margin: 1rem 0;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  `,
})
export class ConfirmationComponent {
  protected readonly data = inject(DIALOG_DATA)
  protected readonly dialogRef = inject(DialogRef)
}
