import { useCallback } from 'react';
import type { ListRenderItemInfo } from 'react-native';
import { SectionList } from 'react-native';
import { CharacterRow } from '@/components/character/CharacterRow';
import { SectionHeader } from '@/components/character/SectionHeader';
import { EmptyState, LoadingFooter } from '@/components/common';
import type { CharacterSectionListProps } from '@/interfaces/components';
import type { Character, CharacterSection } from '@/interfaces/character';
import { LIST_END_THRESHOLD, MESSAGES } from '@/constants';

const NoCharacters = () => <EmptyState message={MESSAGES.emptyList} />;

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
      onEndReachedThreshold={LIST_END_THRESHOLD}
      keyboardShouldPersistTaps="handled"
      ListFooterComponent={loading ? LoadingFooter : null}
      ListEmptyComponent={loading ? null : NoCharacters}
    />
  );
};
