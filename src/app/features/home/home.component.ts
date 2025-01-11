import { Component, inject } from '@angular/core'
import { TilesService } from '@core/services/tiles.service'
import { TileComponent } from './components/tile-item/tile-item.component'

@Component({
  selector: 'section[jt-home]',
  imports: [TileComponent],
  template: `
    @for (tile of store.tiles(); track tile.id) {
      @defer (on viewport) {
        <jt-tile [tile]="tile" />
      } @placeholder {
        <div class="tile-skeleton">
          <span></span>
          <span></span>
          <span></span>
        </div>
      }
    }
  `,
  styles: `
    :host {
      padding: 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }

    .tile-skeleton {
      padding: 1rem;
      height: 200px;
      span {
        display: block;
        height: 1rem;
        width: 100%;
        margin: 1rem 0;
        border-radius: 0.2rem;
        background: linear-gradient(90deg, #ccc 25%, #ddd 50%, #eee 75%);
      }
    }
  `,
})
export class HomeComponent {
  protected readonly store = inject(TilesService)
}
