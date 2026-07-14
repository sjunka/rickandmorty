import { create } from 'zustand';
import type { Filters } from '@/interfaces/character';
import { EMPTY_FILTERS } from '@/utils/filters';

/**
 * The applied filters. They live in a store rather than on the home screen so
 * the modal and the advanced search screen always read the same selection,
 * whatever the navigation does to the screens in between.
 */
interface FiltersState {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  filters: EMPTY_FILTERS,
  setFilters: (filters) => set({ filters }),
  clearFilters: () => set({ filters: EMPTY_FILTERS }),
}));
