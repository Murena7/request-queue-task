import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { createInitialState, UiState } from '@core/states/ui/ui.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends Store<UiState> {
  constructor() {
    super(createInitialState());
  }
}
