import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[wbf-button]',
  template: `<ng-content />`,
  styles: `
    :host {
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      width: 100%;
      transition: filter 0.3s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  `,
})
export class ButtonComponent {}
