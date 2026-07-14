import { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterSectionList } from '@/components/character';
import { ErrorMessage } from '@/components/common';
import { AdvancedSearchHeader, ResultsSummary } from '@/components/search';
import type { Character } from '@/interfaces/character';
import { useCharacters } from '@/hooks/useCharacters';
import { useFiltersStore } from '@/store/useFiltersStore';
import type { SortDirection } from '@/types/filters';
import type { RootStackParamList } from '@/types/navigation';
import { countActiveFilters } from '@/utils/filters';
import { MESSAGES } from '@/constants';

type AdvancedSearchScreenProps = NativeStackScreenProps<RootStackParamList, 'AdvancedSearch'>;

export const AdvancedSearchScreen = ({ navigation, route }: AdvancedSearchScreenProps) => {
  const { search } = route.params;
  const insets = useSafeAreaInsets();
  const [sortDirection] = useState<SortDirection>('asc');

  // Read from the store, so this screen and the filter modal can never disagree.
  const filters = useFiltersStore((state) => state.filters);

  const { sections, visibleCount, loading, error, loadMore } = useCharacters({
    filters,
    search,
    sortDirection,
  });

  // The filters live in a modal on the home screen rather than in the stack,
  // so going back means returning home and reopening it.
  const backToFilters = () => navigation.navigate('Home', { reopenFilters: true });
  const done = () => navigation.navigate('Home');

  const openDetail = (character: Character) => {
    navigation.navigate('CharacterDetail', { id: character.id, name: character.name });
  };

  return (
    <View className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <AdvancedSearchHeader onBack={backToFilters} onDone={done} />

      <ResultsSummary resultCount={visibleCount} filterCount={countActiveFilters(filters)} />

      {error && <ErrorMessage message={MESSAGES.loadCharactersError} />}

      <CharacterSectionList
        sections={sections}
        loading={loading}
        onPressCharacter={openDetail}
        onEndReached={loadMore}
      />
    </View>
  );
};
