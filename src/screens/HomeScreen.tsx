import { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterSectionList } from '@/components/CharacterSectionList';
import { DeletedBanner } from '@/components/DeletedBanner';
import { FilterModal } from '@/components/FilterModal';
import { SearchBar } from '@/components/SearchBar';
import type { Character, Filters } from '@/interfaces/character';
import { useDeletedStore } from '@/store/useDeletedStore';
import type { SortDirection } from '@/types/filters';
import type { RootStackParamList } from '@/types/navigation';
import { countActiveFilters, EMPTY_FILTERS } from '@/utils/filters';
import { useCharacters } from '@/hooks/useCharacters';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const SEARCH_DEBOUNCE_MS = 350;

export const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  // Remembered so the modal reopens on the filters that produced the last search.
  const [lastFilters, setLastFilters] = useState<Filters>(EMPTY_FILTERS);

  const deletedIds = useDeletedStore((state) => state.deletedIds);
  const restoreAll = useDeletedStore((state) => state.restoreAll);

  const reopenFilters = route.params?.reopenFilters ?? false;

  useEffect(() => {
    if (reopenFilters) {
      setFiltersVisible(true);
      navigation.setParams({ reopenFilters: false });
    }
  }, [reopenFilters, navigation]);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [search]);

  // The home list stays unfiltered: applying filters opens the advanced search screen.
  const { sections, loading, error, loadMore } = useCharacters({
    filters: EMPTY_FILTERS,
    search: debouncedSearch,
    sortDirection,
  });

  const toggleSort = useCallback(
    () => setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc')),
    []
  );

  const openFilters = useCallback(() => setFiltersVisible(true), []);
  const closeFilters = useCallback(() => setFiltersVisible(false), []);

  const applyFilters = useCallback(
    (filters: Filters) => {
      setFiltersVisible(false);
      setLastFilters(filters);
      if (countActiveFilters(filters) === 0) return;
      navigation.navigate('AdvancedSearch', { filters, search: debouncedSearch });
    },
    [navigation, debouncedSearch]
  );

  const openDetail = useCallback(
    (character: Character) => {
      navigation.navigate('CharacterDetail', { id: character.id, name: character.name });
    },
    [navigation]
  );

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center justify-between px-4 pb-1 pt-4">
        <Text className="text-2xl font-bold text-gray-900">Rick and Morty list</Text>
        <Pressable
          onPress={toggleSort}
          accessibilityRole="button"
          accessibilityLabel={`Sort by name, currently ${
            sortDirection === 'asc' ? 'A to Z' : 'Z to A'
          }`}
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
        onPressFilters={openFilters}
        activeFilterCount={0}
      />

      <DeletedBanner count={deletedIds.length} onRestore={restoreAll} />

      {error && (
        <Text className="px-4 py-2 text-sm text-red-500">
          Could not load characters. Check your connection and try again.
        </Text>
      )}

      <CharacterSectionList
        sections={sections}
        loading={loading}
        onPressCharacter={openDetail}
        onEndReached={loadMore}
      />

      <FilterModal
        visible={filtersVisible}
        filters={lastFilters}
        onClose={closeFilters}
        onApply={applyFilters}
      />
    </View>
  );
};
