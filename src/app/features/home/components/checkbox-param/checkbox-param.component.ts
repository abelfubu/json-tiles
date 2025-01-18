import { Component, inject, input } from '@angular/core'
import { TileParams } from '@domain/tile/tile-params.model'
import { ParamComponent } from '@features/home/models/param-component.model'
import { TileItemStore } from '../tile-item/tile-item.store'

@Component({
  selector: 'wbf-checkbox-param',
  template: `
    <input
      #input
      [id]="param().id"
      type="checkbox"
      [checked]="param().value"
      (change)="store.updateParam(param().id, input.checked)"
    />
    <label [for]="param().id">{{ param().label }}</label>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  `,
})
export class ChecboxParamComponent implements ParamComponent {
  readonly param = input.required<TileParams>()

  protected readonly store = inject(TileItemStore)
}
