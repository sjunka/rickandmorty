import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterSectionList, DeletedBanner, ListHeader } from '@/components/character';
import { ErrorMessage } from '@/components/common';
import { FilterModal } from '@/components/filters';
import { SearchBar } from '@/components/search';
import type { Character, Filters } from '@/interfaces/character';
import { useCharacters } from '@/hooks/useCharacters';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFiltersStore } from '@/store/useFiltersStore';
import type { SortDirection } from '@/types/filters';
import type { RootStackParamList } from '@/types/navigation';
import { countActiveFilters, EMPTY_FILTERS } from '@/utils/filters';
import { MESSAGES, SEARCH_DEBOUNCE_MS } from '@/constants';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
  const insets = useSafeAreaInsets();
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);

  const deletedIds = useDeletedStore((state) => state.deletedIds);
  const restoreAll = useDeletedStore((state) => state.restoreAll);
  // The applied filters, so reopening the modal shows the selection that
  // produced the results the user just came back from.
  const appliedFilters = useFiltersStore((state) => state.filters);
  const setAppliedFilters = useFiltersStore((state) => state.setFilters);

  const reopenFilters = route.params?.reopenFilters ?? false;

  // Open the modal during render when the param arrives; the effect only
  // clears the param on the navigator (an external system).
  if (reopenFilters && !filtersVisible) setFiltersVisible(true);

  useEffect(() => {
    if (reopenFilters) navigation.setParams({ reopenFilters: false });
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

  const toggleSort = () => setSortDirection((current) => (current === 'asc' ? 'desc' : 'asc'));

  const openFilters = () => setFiltersVisible(true);
  const closeFilters = () => setFiltersVisible(false);

  const applyFilters = (filters: Filters) => {
    setFiltersVisible(false);
    setAppliedFilters(filters);
    if (countActiveFilters(filters) === 0) return;
    navigation.navigate('AdvancedSearch', { search: debouncedSearch });
  };

  const openDetail = (character: Character) => {
    navigation.navigate('CharacterDetail', { id: character.id, name: character.name });
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <ListHeader sortDirection={sortDirection} onToggleSort={toggleSort} />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        onPressFilters={openFilters}
        activeFilterCount={0}
      />

      <DeletedBanner count={deletedIds.length} onRestore={restoreAll} />

      {error && <ErrorMessage message={MESSAGES.loadCharactersError} />}

      <CharacterSectionList
        sections={sections}
        loading={loading}
        onPressCharacter={openDetail}
        onEndReached={loadMore}
      />

      <FilterModal
        visible={filtersVisible}
        filters={appliedFilters}
        onClose={closeFilters}
        onApply={applyFilters}
      />
    </View>
  );
};
