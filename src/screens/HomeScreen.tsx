import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, SectionList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@apollo/client/react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GET_CHARACTERS } from '@/services/queries';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { Character, CharactersQueryData, SortDirection } from '@/types/character';
import type { RootStackParamList } from '@/types/navigation';
import { sortCharactersByName } from '@/utils/sortCharacters';
import { CharacterRow } from '@/components/CharacterRow';
import { SectionHeader } from '@/components/SectionHeader';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  const { data, loading, error, fetchMore } = useQuery<CharactersQueryData>(GET_CHARACTERS, {
    variables: { page: 1 },
  });

  const nextPage = data?.characters.info.next ?? null;

  const sections = useMemo(() => {
    const characters = sortCharactersByName(data?.characters.results ?? [], sortDirection);
    const starred = characters.filter((character) => favoriteIds.includes(character.id));
    const rest = characters.filter((character) => !favoriteIds.includes(character.id));

    const result = [];
    if (starred.length > 0) {
      result.push({ title: 'Starred Characters', data: starred });
    }
    result.push({ title: 'Characters', data: rest });
    return result;
  }, [data, favoriteIds, sortDirection]);

  const loadMore = () => {
    if (nextPage) {
      fetchMore({ variables: { page: nextPage } });
    }
  };

  const openDetail = (character: Character) => {
    navigation.navigate('CharacterDetail', { id: character.id, name: character.name });
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

      {error && (
        <Text className="px-4 py-2 text-sm text-red-500">
          Could not load characters. Pull to retry or check your connection.
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
        ListFooterComponent={loading ? <ActivityIndicator className="py-6" color="#7A56C0" /> : null}
        ListEmptyComponent={
          !loading && !error ? (
            <Text className="px-4 py-8 text-center text-gray-400">No characters found.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};
