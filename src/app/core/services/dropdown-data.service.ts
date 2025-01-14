import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, of, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class DropdownDataService {
  private readonly cache = new Map<string, Record<string, unknown>[]>()
  private readonly http = inject(HttpClient)

  getOptions(url: string): Observable<Record<string, unknown>[]> {
    const cached = this.cache.get(url)

    if (cached) {
      return of(cached)
    }

    return this.http.get<Record<string, unknown>[]>(url).pipe(
      tap((response) => {
        this.cache.set(url, response)
      }),
    )
  }
}
