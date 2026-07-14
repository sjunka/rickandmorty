import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client/react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GET_CHARACTERS } from '@/services/queries';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { Character, CharactersQueryData, Filters, SortDirection } from '@/types/character';
import type { RootStackParamList } from '@/types/navigation';
import { applyLocalFilters, countActiveFilters, EMPTY_FILTERS, toApiFilter } from '@/utils/filters';
import { sortCharactersByName } from '@/utils/sortCharacters';
import { CharacterRow } from '@/components/CharacterRow';
import { DeletedBanner } from '@/components/DeletedBanner';
import { FilterModal } from '@/components/FilterModal';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const SEARCH_DEBOUNCE_MS = 350;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const deletedIds = useDeletedStore((state) => state.deletedIds);
  const restoreAll = useDeletedStore((state) => state.restoreAll);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [search]);

  const apiFilter = useMemo(
    () => toApiFilter(filters, debouncedSearch),
    [filters, debouncedSearch]
  );

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
    const starred = sorted.filter((character) => favoriteIds.includes(character.id));
    const others = sorted.filter((character) => !favoriteIds.includes(character.id));

    const result = [];
    if (starred.length > 0) {
      result.push({ title: 'Starred Characters', data: starred });
    }
    if (others.length > 0) {
      result.push({ title: 'Characters', data: others });
    }
    return { sections: result, visibleCount: sorted.length };
  }, [data, favoriteIds, deletedIds, filters.kind, sortDirection]);

  const activeFilterCount = countActiveFilters(filters);

  const loadMore = () => {
    if (nextPage && !loading) {
      fetchMore({ variables: { page: nextPage, filter: apiFilter } });
    }
  };

  const openDetail = (character: Character) => {
    navigation.navigate('CharacterDetail', { id: character.id, name: character.name });
  };

  const applyFilters = (nextFilters: Filters) => {
    setFilters(nextFilters);
    setFiltersVisible(false);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 pb-1 pt-2">
        <Text className="text-2xl font-bold text-gray-900">Rick and Morty list</Text>
        <Pressable
          onPress={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
          accessibilityRole="button"
          accessibilityLabel={`Sort by name, currently ${sortDirection === 'asc' ? 'A to Z' : 'Z to A'}`}
          className="rounded-full bg-primary-100 px-3 py-1"
        >
          <Text className="text-sm font-semibold text-primary-600">
            {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
          </Text>
        </Pressable>
      </View>

      <SearchBar
        value={search}
        onChangeText={setSearch}
        onPressFilters={() => setFiltersVisible(true)}
        activeFilterCount={activeFilterCount}
      />

      {activeFilterCount > 0 && (
        <View className="mx-4 mb-2 flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-primary-600">
            {visibleCount} Result{visibleCount === 1 ? '' : 's'}
          </Text>
          <View className="rounded-full bg-secondary-600/20 px-3 py-1">
            <Text className="text-xs font-semibold text-gray-700">
              {activeFilterCount} Filter{activeFilterCount > 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      )}

      <DeletedBanner count={deletedIds.length} onRestore={restoreAll} />

      {error && (
        <Text className="px-4 py-2 text-sm text-red-500">
          Could not load characters. Check your connection and try again.
        </Text>
      )}

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CharacterRow character={item} onPress={() => openDetail(item)} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} count={section.data.length} />
        )}
        stickySectionHeadersEnabled={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={loading ? <ActivityIndicator className="py-6" color="#7A56C0" /> : null}
        ListEmptyComponent={
          !loading ? (
            <Text className="px-4 py-8 text-center text-gray-400">
              No characters match your search.
            </Text>
          ) : null
        }
      />

      <FilterModal
        visible={filtersVisible}
        filters={filters}
        onClose={() => setFiltersVisible(false)}
        onApply={applyFilters}
      />
    </SafeAreaView>
  );
};
