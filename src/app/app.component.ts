import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from '@libs/ui/header/header.component'
import { LoaderComponent } from '@libs/ui/loader/loader.component'

@Component({
  selector: 'wbf-root',
  imports: [RouterOutlet, HeaderComponent, LoaderComponent],
  template: `
    <header wbf-header></header>
    <router-outlet />
    <wbf-loader />
  `,
})
export class AppComponent {}
