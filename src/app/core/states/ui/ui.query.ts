import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { UiStore } from './ui.store';
import { UiState } from '@core/states/ui/ui.model';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<UiState> {
  constructor(protected override store: UiStore) {
    super(store);
  }

  isLoading$ = this.select('isLoading');
}
