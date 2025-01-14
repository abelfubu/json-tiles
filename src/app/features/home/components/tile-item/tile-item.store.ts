import { computed, inject, Injectable, signal } from '@angular/core'
import { DropdownDataService } from '@core/services/dropdown-data.service'
import { SelectTileParams } from '@domain/tile/select-tile-params.model'
import { Tile } from '@domain/tile/tile.model'
import { map } from 'rxjs'

interface TileItemState {
  tile: Tile
  dropdownOptions: Record<string, unknown>
}

@Injectable()
export class TileItemStore {
  private readonly dropdownData = inject(DropdownDataService)
  private readonly tileState = signal<TileItemState>({
    tile: { id: '', params: [], url: '', method: 'POST', title: '' },
    dropdownOptions: {},
  })

  readonly tile = computed(() => this.tileState().tile)
  readonly options = computed(() => this.tileState().dropdownOptions)

  init(tile: Tile): void {
    this.tileState.update((state) => ({ ...state, tile }))
  }

  getDropdownOptions({ url, type, labelKey, valueKey, id }: SelectTileParams) {
    if (type !== 'select') {
      throw new Error('Only select type is supported')
    }

    this.dropdownData
      .getOptions(url)
      .pipe(
        map((response) =>
          response.map((x) => ({ label: x[labelKey], value: x[valueKey] })),
        ),
      )
      .subscribe((response) => {
        this.tileState.update((state) => ({
          ...state,
          dropdownOptions: {
            ...state.dropdownOptions,
            [id]: response,
          },
        }))
      })
  }

  updateParam(id: string, value: string | boolean | number): void {
    this.tileState.update((state) => ({
      ...state,
      tile: {
        ...state.tile,
        params: (state.tile.params || []).map((param) => {
          if (param.id === id) {
            return { ...param, value }
          }

          return param
        }),
      },
    }))
  }

  onAccept({ confirmation, method, url }: Tile): void {
    if (!confirmation) {
      console.log(method, url, this.getRequestBody())
      return
    }

    const response = confirm(this.tile().confirmation)

    if (response) {
      console.log(this.tile().method, this.tile().url, this.getRequestBody())
    }
  }

  private getRequestBody() {
    return this.tileState().tile.params.reduce(
      (body, param) => ({ ...body, [param.field]: param.value }),

      {},
    )
  }
}
