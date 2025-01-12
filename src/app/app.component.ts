import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from '@libs/ui/header/header.component'
import { LoaderComponent } from '@libs/ui/loader/loader.component'

@Component({
  selector: 'jt-root',
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  template: `
    <header jt-header></header>
    <router-outlet />
    <jt-loader />
  `,
})
export class AppComponent {}
