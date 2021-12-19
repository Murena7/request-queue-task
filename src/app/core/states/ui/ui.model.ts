export interface UiState {
  isLoading: boolean;
}

export function createInitialState(): UiState {
  return {
    isLoading: false,
  };
}
