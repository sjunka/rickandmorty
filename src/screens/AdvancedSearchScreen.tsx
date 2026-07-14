import { useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CharacterSectionList } from '@/components/CharacterSectionList';
import { ResultsSummary } from '@/components/ResultsSummary';
import type { Character } from '@/interfaces/character';
import { useFiltersStore } from '@/store/useFiltersStore';
import type { RootStackParamList } from '@/types/navigation';
import type { SortDirection } from '@/types/filters';
import { countActiveFilters } from '@/utils/filters';
import { useCharacters } from '@/hooks/useCharacters';

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
  const backToFilters = useCallback(
    () => navigation.navigate('Home', { reopenFilters: true }),
    [navigation]
  );
  const done = useCallback(() => navigation.navigate('Home'), [navigation]);

  const openDetail = useCallback(
    (character: Character) => {
      navigation.navigate('CharacterDetail', { id: character.id, name: character.name });
    },
    [navigation]
  );

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="flex-row items-center px-4 py-3">
        <Pressable
          onPress={backToFilters}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back to filters"
        >
          <Ionicons name="arrow-back" size={24} color="#7A56C0" />
        </Pressable>
        <Text className="flex-1 text-center text-base font-semibold text-gray-900">
          Advanced search
        </Text>
        <Pressable onPress={done} hitSlop={8} accessibilityRole="button" accessibilityLabel="Done">
          <Text className="text-base font-semibold text-primary-600">Done</Text>
        </Pressable>
      </View>

      <ResultsSummary resultCount={visibleCount} filterCount={countActiveFilters(filters)} />

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
    </View>
  );
};
