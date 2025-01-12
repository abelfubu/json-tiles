import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class LoaderStore {
  private readonly state = signal(false)
  readonly loading = this.state.asReadonly()

  setLoading(loading: boolean): void {
    this.state.set(loading)
  }
}
