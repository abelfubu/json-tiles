import { HttpClient } from '@angular/common/http'
import { inject, Injectable, signal } from '@angular/core'
import { Tile } from '@domain/tile/tile.model'
import { Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TilesService {
  private readonly http = inject(HttpClient)

  private readonly tilesState = signal<Tile[]>([])

  readonly tiles = this.tilesState.asReadonly()

  load(): Observable<{ tiles: Tile[] }> {
    return this.http.get<{ tiles: Tile[] }>('/data.json').pipe(
      tap((response) => {
        this.tilesState.set(
          response.tiles.map((t) => ({
            ...t,
            id: crypto.randomUUID(),
            params: t.params.map((p) => ({ ...p, id: crypto.randomUUID() })),
          })),
        )
      }),
    )
  }
}
