import { useCallback } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { ActivityIndicator, SectionList, Text } from 'react-native';
import { CharacterRow } from '@/components/CharacterRow';
import { SectionHeader } from '@/components/SectionHeader';
import type { CharacterSectionListProps } from '@/interfaces/components';
import type { Character, CharacterSection } from '@/interfaces/character';

/** The starred/others list, shared by the home and advanced search screens. */
export const CharacterSectionList = ({
  sections,
  loading,
  onPressCharacter,
  onEndReached,
}: CharacterSectionListProps) => {
  const renderCharacter = useCallback(
    ({ item }: ListRenderItemInfo<Character>) => (
      <CharacterRow character={item} onPress={onPressCharacter} />
    ),
    [onPressCharacter]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: CharacterSection }) => (
      <SectionHeader title={section.title} count={section.data.length} />
    ),
    []
  );

  const keyExtractor = useCallback((character: Character) => character.id, []);

  return (
    <SectionList
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderCharacter}
      renderSectionHeader={renderSectionHeader}
      stickySectionHeadersEnabled={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      keyboardShouldPersistTaps="handled"
      ListFooterComponent={loading ? <ActivityIndicator className="py-6" color="#7A56C0" /> : null}
      ListEmptyComponent={
        loading ? null : (
          <Text className="px-4 py-8 text-center text-gray-400">
            No characters match your search.
          </Text>
        )
      }
    />
  );
};
