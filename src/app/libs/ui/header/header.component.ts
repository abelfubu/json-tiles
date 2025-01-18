import { Component } from '@angular/core'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'header[wbf-header]',
  template: `
    <img
      src="https://cdn.wolterskluwer.io/wk/fundamentals/1.x.x/logo/assets/white-medium.svg"
      alt="Wolters Kluwer"
    />
  `,
  styles: `
    :host {
      padding: 1rem;
      background-color: #007ac3;
      color: #fff;
    }
  `,
})
export class HeaderComponent {}
