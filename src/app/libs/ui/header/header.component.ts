import { Component } from '@angular/core'

@Component({
  selector: 'header[jt-header]',
  template: ` <h1>WK Backoffice</h1> `,
  styles: `
    :host {
      padding: 1rem;
      background-color: #007ac3;
      color: #fff;
    }
  `,
})
export class HeaderComponent {}
