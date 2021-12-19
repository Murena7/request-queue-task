import { Injectable } from '@angular/core';
import { UiStore } from './ui.store';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private uiStore: UiStore) {}

  isLoading(status: boolean): void {
    this.uiStore.update({ isLoading: status });
  }
}
