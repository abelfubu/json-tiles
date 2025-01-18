import { computed, inject, Injectable, signal } from '@angular/core'
import { DropdownDataService } from '@core/services/dropdown-data.service'
import { TilesService } from '@core/services/tiles.service'
import { SelectTileParams } from '@domain/tile/select-tile-params.model'
import { Tile } from '@domain/tile/tile.model'
import { ConfirmationService } from '@libs/ui/confirmation/confirmation.service'
import { ToastService } from '@libs/ui/toast/toast.service'
import { filter, catchError, EMPTY, map, Observable, tap } from 'rxjs'

interface TileItemState {
  tile: Tile
  dropdownOptions: Record<string, unknown>
}

@Injectable()
export class TileItemStore {
  private readonly dropdownData = inject(DropdownDataService)
  private readonly tileService = inject(TilesService)
  private readonly confirmation = inject(ConfirmationService)
  private readonly toast = inject(ToastService)

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
      this.sendRequest().subscribe()
      return
    }

    this.confirmation
      .confirm(this.tile().confirmation!)
      .pipe(filter(Boolean))
      .subscribe(() => {
        console.log(method, url, this.getRequestBody())
        this.sendRequest().subscribe()
      })
  }

  private getRequestBody() {
    return this.tileState().tile.params.reduce(
      (body, param) => ({ ...body, [param.field]: param.value }),
      {},
    )
  }

  private sendRequest(): Observable<unknown> {
    return this.tileService.send(this.tile(), this.getRequestBody()).pipe(
      tap(() => this.toast.success('Request sent successfully')),
      catchError((error) => {
        this.toast.error(error.message)
        return EMPTY
      }),
    )
  }
}
