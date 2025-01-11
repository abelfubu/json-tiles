import { Component, computed, effect, inject, input, Type } from '@angular/core'
import { TileParams } from '@domain/tile/tile-params.model'
import { Tile } from '@domain/tile/tile.model'
import { ButtonComponent } from '@libs/ui/button/button.component'
import { TileItemStore } from './tile-item.store'
import { NgComponentOutlet } from '@angular/common'
import { SelectParamComponent } from '../select-param/select-param.component'
import { TextParamComponent } from '../text-param/text-param.component'
import { ParamComponent } from '@features/home/models/param-component.model'
import { NumberParamComponent } from '../number-param/number-param.component'
import { ChecboxParamComponent } from '../checkbox-param/checkbox-param.component'

@Component({
  selector: 'jt-tile',
  imports: [ButtonComponent, NgComponentOutlet],
  providers: [TileItemStore],
  template: `
    <h3>{{ tile().title }}</h3>

    <div class="params-container">
      @for (param of params(); track param.id) {
        <ng-container *ngComponentOutlet="param.component; inputs: { param }" />
      }
    </div>

    <div class="tile-actions">
      <button jt-button class="align-end" (click)="onAccept()">Aceptar</button>
    </div>
  `,

  styles: `
    :host {
      display: flex;
      flex-direction: column;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      padding: 1rem;
      border-radius: 0.2rem;

      h3 {
        flex: 1 1 0;
      }
    }

    .params-container {
      margin: 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .tile-actions {
      text-align: right;
    }
  `,
})
export class TileComponent {
  private readonly store = inject(TileItemStore)
  readonly tile = input.required<Tile>()

  init = effect(() => {
    this.store.init(this.tile())
  })

  protected readonly paramsComponentMap: Record<
    TileParams['type'],
    Type<ParamComponent>
  > = {
    number: NumberParamComponent,
    text: TextParamComponent,
    select: SelectParamComponent,
    checkbox: ChecboxParamComponent,
  }

  protected readonly params = computed(() =>
    this.tile().params.map((param) => ({
      ...param,
      component: this.paramsComponentMap[param.type],
    })),
  )

  onAccept(): void {
    const confirmation = this.tile().confirmation

    if (!confirmation) {
      console.log(this.tile().url, this.store.getRequestBody())
      return
    }

    const response = confirm(this.tile().confirmation)

    if (response) {
      console.log(this.tile().url, this.store.getRequestBody())
    }
  }
}
