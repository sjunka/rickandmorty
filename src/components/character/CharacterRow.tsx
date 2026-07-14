import { useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import type { CharacterRowProps } from '@/interfaces/components';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';

export const CharacterRow = ({ character, onPress }: CharacterRowProps) => {
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(character.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const deleteCharacter = useDeletedStore((state) => state.deleteCharacter);

  const handlePress = useCallback(() => onPress(character), [onPress, character]);
  const handleToggleFavorite = useCallback(
    () => toggleFavorite(character.id),
    [toggleFavorite, character.id]
  );
  const handleDelete = useCallback(
    () => deleteCharacter(character.id),
    [deleteCharacter, character.id]
  );

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleDelete}
      accessibilityRole="button"
      accessibilityLabel={`${character.name}, ${character.species}`}
      accessibilityHint="Long press to remove this character from the list"
      className="flex-row items-center border-b border-gray-100 bg-white px-4 py-3 active:bg-primary-100"
    >
      <Image source={{ uri: character.image }} className="h-10 w-10 rounded-full" />
      <View className="ml-4 flex-1">
        <Text className="text-base font-semibold text-gray-800">{character.name}</Text>
        <Text className="text-sm text-gray-400">{character.species}</Text>
      </View>
      <Pressable
        onPress={handleToggleFavorite}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite
            ? `Remove ${character.name} from favorites`
            : `Add ${character.name} to favorites`
        }
      >
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? '#82D554' : '#D1D5DB'}
        />
      </Pressable>
    </Pressable>
  );
};
