import { Component, inject, input } from '@angular/core'
import { TileParams } from '@domain/tile/tile-params.model'
import { ParamComponent } from '@features/home/models/param-component.model'
import { TileItemStore } from '../tile-item/tile-item.store'

@Component({
  selector: 'jt-number-param',
  template: `
    <label [for]="param().id">{{ param().label }}</label>
    <input
      #input
      [id]="param().id"
      type="number"
      (change)="store.updateParam(param().id, input.value)"
    />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  `,
})
export class NumberParamComponent implements ParamComponent {
  readonly param = input.required<TileParams>()
  protected readonly store = inject(TileItemStore)
}
