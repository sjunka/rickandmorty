import { KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import { useQuery } from '@apollo/client/react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FullScreenLoader, FullScreenMessage } from '@/components/common';
import {
  CharacterAvatar,
  CharacterFields,
  CommentInput,
  CommentList,
} from '@/components/detail';
import type { Comment } from '@/interfaces/character';
import type { CharacterQuery, CharacterQueryVariables } from '@/services/graphql.generated';
import { toCharacterDetail } from '@/services/mappers';
import { GET_CHARACTER } from '@/services/queries';
import { useCommentsStore } from '@/store/useCommentsStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { RootStackParamList } from '@/types/navigation';
import { IOS_KEYBOARD_OFFSET, MESSAGES } from '@/constants';

type CharacterDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetail'>;

// Stable fallback: an inline `?? []` inside the selector would return a new
// array on every snapshot and send Zustand v5 into an infinite render loop.
const NO_COMMENTS: Comment[] = [];

export const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
  const { id } = route.params;

  const { data, loading, error } = useQuery<CharacterQuery, CharacterQueryVariables>(GET_CHARACTER, {
    variables: { id },
  });

  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const comments = useCommentsStore((state) => state.commentsByCharacter[id]) ?? NO_COMMENTS;
  const addComment = useCommentsStore((state) => state.addComment);

  const handleToggleFavorite = () => toggleFavorite(id);
  const handleAddComment = (text: string) => addComment(id, text);

  const character = toCharacterDetail(data);

  if (loading) return <FullScreenLoader />;
  if (error || !character) return <FullScreenMessage message={MESSAGES.loadDetailError} />;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-gray-900"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? IOS_KEYBOARD_OFFSET : 0}
    >
      <ScrollView className="flex-1 px-4" keyboardShouldPersistTaps="handled">
        <CharacterAvatar
          characterId={id}
          image={character.image}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />

        <Text className="mt-3 text-2xl font-bold text-gray-900 dark:text-gray-100">{character.name}</Text>

        <CharacterFields character={character} />

        <CommentList comments={comments} />

        <CommentInput onSubmit={handleAddComment} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
