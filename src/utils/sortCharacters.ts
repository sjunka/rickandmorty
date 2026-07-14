import type { Character } from '@/interfaces/character';
import type { SortDirection } from '@/types/filters';

export function sortCharactersByName<T extends Character>(
  characters: T[],
  direction: SortDirection
): T[] {
  return [...characters].sort((a, b) =>
    direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
  );
}
