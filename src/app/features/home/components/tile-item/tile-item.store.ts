import { HttpClient } from '@angular/common/http'
import { computed, inject, Injectable, signal } from '@angular/core'
import { TileParams } from '@domain/tile/tile-params.model'
import { Tile } from '@domain/tile/tile.model'

@Injectable()
export class TileItemStore {
  private readonly http = inject(HttpClient)
  private readonly tileState = signal<{
    tile: Tile
    dropdownOptions: Record<string, unknown>
  }>({
    tile: { id: '', params: [], url: '', method: 'POST', title: '' },
    dropdownOptions: {},
  })

  readonly tile = computed(() => this.tileState().tile)
  readonly options = computed(() => this.tileState().dropdownOptions)

  init(tile: Tile): void {
    this.tileState.update((state) => ({ ...state, tile }))
  }

  getDropdownOptions(param: TileParams) {
    if (param.type !== 'select') {
      throw new Error('Only select type is supported')
    }

    this.http
      .get<Record<string, unknown>[]>(param.url)
      .subscribe((response) => {
        this.tileState.update((state) => ({
          ...state,
          dropdownOptions: {
            ...state.dropdownOptions,
            [param.id]: response.map((x) => ({
              label: x[param.labelKey],
              value: x[param.valueKey],
            })),
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
