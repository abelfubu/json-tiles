import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import {
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http'
import { TilesService } from '@core/services/tiles.service'
import { routes } from './app.routes'
import { LoaderStore } from '@core/stores/loader.store'
import { finalize } from 'rxjs'

const loaderInterceptor: HttpInterceptorFn = (request, next) => {
  const store = inject(LoaderStore)

  store.setLoading(true)

  return next(request).pipe(finalize(() => store.setLoading(false)))
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideAppInitializer(() => inject(TilesService).load()),
  ],
}
