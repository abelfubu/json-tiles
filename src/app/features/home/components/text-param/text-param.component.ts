import { Component, inject, input } from '@angular/core'
import { TileParams } from '@domain/tile/tile-params.model'
import { ParamComponent } from '@features/home/models/param-component.model'
import { TileItemStore } from '../tile-item/tile-item.store'

@Component({
  selector: 'wbf-text-param',
  template: `
    <label [for]="param().id">{{ param().label }}</label>
    <input
      #input
      [id]="param().id"
      [value]="param().value"
      type="text"
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
export class TextParamComponent implements ParamComponent {
  readonly param = input.required<TileParams>()
  protected readonly store = inject(TileItemStore)
}
