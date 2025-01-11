import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from '@libs/ui/header/header.component'

@Component({
  selector: 'jt-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <header jt-header></header>
    <router-outlet />
  `,
})
export class AppComponent {}
