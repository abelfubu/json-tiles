import { Component, effect, inject, input } from '@angular/core'
import { TileParams } from '@domain/tile/tile-params.model'
import { ParamComponent } from '@features/home/models/param-component.model'
import { TileItemStore } from '../tile-item/tile-item.store'

@Component({
  selector: 'jt-select-param',
  template: `
    <label [for]="param().id">{{ param().label }}</label>
    <select #select [id]="param().id" (change)="update(select.value)">
      @for (option of store.options()[param().id] || []; track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }
  `,
})
export class SelectParamComponent implements ParamComponent {
  protected readonly store = inject(TileItemStore)
  readonly param = input.required<TileParams>()

  load = effect(() => {
    this.store.getDropdownOptions(this.param())
  })

  update(value: string): void {
    this.store.updateParam(this.param().id, value)
  }
}
