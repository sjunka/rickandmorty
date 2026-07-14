import { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client/react';
import type { CharactersQueryData, CharacterSection, Filters } from '@/interfaces/character';
import { GET_CHARACTERS } from '@/services/queries';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { SortDirection } from '@/types/filters';
import { applyLocalFilters, toApiFilter } from '@/utils/filters';
import { sortCharactersByName } from '@/utils/sortCharacters';

interface UseCharactersOptions {
  filters: Filters;
  search: string;
  sortDirection: SortDirection;
}

interface UseCharactersResult {
  sections: CharacterSection[];
  visibleCount: number;
  loading: boolean;
  error: boolean;
  loadMore: () => void;
}

/**
 * Fetches characters for the given filters and splits them into the starred
 * and others sections. Both the home and advanced search screens use it, so
 * the list rules live in one place.
 */
export function useCharacters({
  filters,
  search,
  sortDirection,
}: UseCharactersOptions): UseCharactersResult {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const deletedIds = useDeletedStore((state) => state.deletedIds);

  const apiFilter = useMemo(() => toApiFilter(filters, search), [filters, search]);

  const { data, loading, error, fetchMore } = useQuery<CharactersQueryData>(GET_CHARACTERS, {
    variables: { page: 1, filter: apiFilter },
    notifyOnNetworkStatusChange: true,
  });

  const nextPage = data?.characters.info.next ?? null;

  const { sections, visibleCount } = useMemo(() => {
    const visible = applyLocalFilters(data?.characters.results ?? [], {
      favoriteIds,
      deletedIds,
      kind: filters.kind,
    });
    const sorted = sortCharactersByName(visible, sortDirection);
    const favorites = new Set(favoriteIds);
    const starred = sorted.filter((character) => favorites.has(character.id));
    const others = sorted.filter((character) => !favorites.has(character.id));

    const result: CharacterSection[] = [];
    if (starred.length > 0) result.push({ title: 'Starred Characters', data: starred });
    if (others.length > 0) result.push({ title: 'Characters', data: others });

    return { sections: result, visibleCount: sorted.length };
  }, [data, favoriteIds, deletedIds, filters.kind, sortDirection]);

  const loadMore = useCallback(() => {
    if (nextPage && !loading) {
      fetchMore({ variables: { page: nextPage, filter: apiFilter } });
    }
  }, [nextPage, loading, fetchMore, apiFilter]);

  return { sections, visibleCount, loading, error: Boolean(error), loadMore };
}
