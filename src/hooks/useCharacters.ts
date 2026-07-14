import { useQuery } from '@apollo/client/react';
import type { CharacterSection, Filters } from '@/interfaces/character';
import type { CharactersQuery, CharactersQueryVariables } from '@/services/graphql.generated';
import { toCharacters, toNextPage } from '@/services/mappers';
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

  const apiFilter = toApiFilter(filters, search);

  const { data, loading, error, fetchMore } = useQuery<CharactersQuery, CharactersQueryVariables>(GET_CHARACTERS, {
    variables: { page: 1, filter: apiFilter },
    notifyOnNetworkStatusChange: true,
  });

  const nextPage = toNextPage(data);

  const visible = applyLocalFilters(toCharacters(data), {
    favoriteIds,
    deletedIds,
    kind: filters.kind,
  });
  const sorted = sortCharactersByName(visible, sortDirection);
  const favorites = new Set(favoriteIds);
  const starred = sorted.filter((character) => favorites.has(character.id));
  const others = sorted.filter((character) => !favorites.has(character.id));

  const sections: CharacterSection[] = [];
  if (starred.length > 0) sections.push({ title: 'Starred Characters', data: starred });
  if (others.length > 0) sections.push({ title: 'Characters', data: others });

  const loadMore = () => {
    if (nextPage && !loading) {
      fetchMore({ variables: { page: nextPage, filter: apiFilter } });
    }
  };

  return { sections, visibleCount: sorted.length, loading, error: Boolean(error), loadMore };
}
