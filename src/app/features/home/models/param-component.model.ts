import { InputSignal } from '@angular/core'
import { TileParams } from '@domain/tile/tile-params.model'

export interface ParamComponent {
  readonly param: InputSignal<TileParams>
}
