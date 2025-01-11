import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core'
import { provideRouter } from '@angular/router'

import { provideHttpClient } from '@angular/common/http'
import { TilesService } from '@core/services/tiles.service'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => inject(TilesService).load()),
  ],
}
