import type { ApiFilter, Character, Filters } from '@/interfaces/character';
import type { CharacterKind } from '@/types/filters';

export const EMPTY_FILTERS: Filters = {
  kind: 'all',
  species: 'all',
  status: 'all',
  gender: 'all',
};

const FILTER_LABELS: Record<string, string> = {
  all: 'All',
  starred: 'Starred',
  others: 'Others',
  unknown: 'Unknown',
};

/** Turns a filter value into the label shown on its pill. */
export function formatFilterLabel(option: string): string {
  return FILTER_LABELS[option] ?? option;
}

/** Number of filters set to something other than "all", for the results badge. */
export function countActiveFilters(filters: Filters): number {
  return Object.values(filters).filter((value) => value !== 'all').length;
}

/** Maps UI filters to the arguments the GraphQL API accepts. */
export function toApiFilter(filters: Filters, search: string): ApiFilter {
  const apiFilter: ApiFilter = {};
  if (search.trim()) apiFilter.name = search.trim();
  if (filters.species !== 'all') apiFilter.species = filters.species;
  if (filters.status !== 'all') apiFilter.status = filters.status;
  if (filters.gender !== 'all') apiFilter.gender = filters.gender;
  return apiFilter;
}

interface VisibilityOptions {
  favoriteIds: string[];
  deletedIds: string[];
  kind: CharacterKind;
}

/** Applies the client-side rules the API cannot express: starred and soft delete. */
export function applyLocalFilters<T extends Character>(
  characters: T[],
  { favoriteIds, deletedIds, kind }: VisibilityOptions
): T[] {
  return characters.filter((character) => {
    if (deletedIds.includes(character.id)) return false;
    if (kind === 'starred') return favoriteIds.includes(character.id);
    if (kind === 'others') return !favoriteIds.includes(character.id);
    return true;
  });
}
