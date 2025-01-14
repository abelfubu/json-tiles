import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core'
import { SelectTileParams } from '@domain/tile/select-tile-params.model'
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectParamComponent implements OnInit, ParamComponent {
  protected readonly store = inject(TileItemStore)
  readonly param = input.required<TileParams>()

  ngOnInit(): void {
    this.store.getDropdownOptions(this.param() as SelectTileParams)
  }

  update(value: string): void {
    this.store.updateParam(this.param().id, value)
  }
}
