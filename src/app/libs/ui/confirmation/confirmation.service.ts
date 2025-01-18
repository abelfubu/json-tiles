import { inject, Injectable } from '@angular/core'
import { DialogService } from '../dialog/dialog.service'
import { ConfirmationComponent } from './confirmation.component'

@Injectable({
  providedIn: 'root',
})
export class ConfirmationService {
  private readonly dialog = inject(DialogService)

  confirm(message: string) {
    return this.dialog.open(ConfirmationComponent, message)
  }
}
