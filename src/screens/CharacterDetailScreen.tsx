import { useCallback } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@apollo/client/react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommentInput } from '@/components/CommentInput';
import { DetailField } from '@/components/DetailField';
import type { CharacterQueryData, Comment } from '@/interfaces/character';
import { GET_CHARACTER } from '@/services/queries';
import { useCommentsStore } from '@/store/useCommentsStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { RootStackParamList } from '@/types/navigation';

type CharacterDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'CharacterDetail'>;

// Stable fallback: an inline `?? []` inside the selector would return a new
// array on every snapshot and send Zustand v5 into an infinite render loop.
const NO_COMMENTS: Comment[] = [];

export const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
  const { id } = route.params;

  const { data, loading, error } = useQuery<CharacterQueryData>(GET_CHARACTER, {
    variables: { id },
  });

  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const comments = useCommentsStore((state) => state.commentsByCharacter[id]) ?? NO_COMMENTS;
  const addComment = useCommentsStore((state) => state.addComment);

  const handleToggleFavorite = useCallback(() => toggleFavorite(id), [toggleFavorite, id]);
  const handleAddComment = useCallback(
    (text: string) => addComment(id, text),
    [addComment, id]
  );

  if (loading) {
    return <ActivityIndicator className="flex-1 bg-white" color="#7A56C0" />;
  }

  if (error || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-8">
        <Text className="text-center text-gray-500">
          Could not load this character. Check your connection and try again.
        </Text>
      </View>
    );
  }

  const { character } = data;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView className="flex-1 px-4" keyboardShouldPersistTaps="handled">
        <View className="mt-2 self-start">
          <Image source={{ uri: character.image }} className="h-20 w-20 rounded-full" />
          <Pressable
            onPress={handleToggleFavorite}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="absolute -bottom-1 -right-1 rounded-full bg-white p-1"
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? '#82D554' : '#D1D5DB'}
            />
          </Pressable>
        </View>

        <Text className="mt-3 text-2xl font-bold text-gray-900">{character.name}</Text>

        <View className="mt-4">
          <DetailField label="Specie" value={character.species} />
          <DetailField label="Status" value={character.status} />
          <DetailField label="Gender" value={character.gender} />
          <DetailField label="Origin" value={character.origin.name} />
          <DetailField label="Location" value={character.location.name} />
        </View>

        <Text className="mt-6 text-base font-semibold text-gray-800">
          Comments ({comments.length})
        </Text>
        {comments.length === 0 && (
          <Text className="mt-2 text-sm text-gray-400">No comments yet. Add the first one.</Text>
        )}
        {comments.map((comment) => (
          <View key={comment.id} className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
            <Text className="text-sm text-gray-700">{comment.text}</Text>
            <Text className="mt-1 text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </Text>
          </View>
        ))}

        <CommentInput onSubmit={handleAddComment} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
