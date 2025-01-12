import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { LoaderStore } from '@core/stores/loader.store'

@Component({
  selector: 'jt-loader',
  template: `
    @if (store.loading()) {
      <div class="loader">
        <div class="loader__spinner"></div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    .loader {
      position: absolute;
      inset: 0;
      margin: auto;
      height: 100px;
      width: 100px;
      z-index: 1000;
    }

    .loader__spinner {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 5px solid transparent;
      border-top-color: #3498db;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
        filter: hue-rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
        filter: hue-rotate(360deg);
      }
    }
  `,
})
export class LoaderComponent {
  protected readonly store = inject(LoaderStore)
}
