import { Dialog } from '@angular/cdk/dialog'
import { ComponentType } from '@angular/cdk/portal'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(Dialog)

  open<T, U>(
    component: ComponentType<unknown>,
    data: U,
  ): Observable<T | undefined> {
    return this.dialog.open<T | undefined, U>(component, { data }).closed
  }
}
