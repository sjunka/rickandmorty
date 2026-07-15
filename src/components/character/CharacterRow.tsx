import { Pressable, Text, View } from 'react-native';
import { AnimatedHeart, RemoteImage } from '@/components/common';
import type { CharacterRowProps } from '@/interfaces/components';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { ICON_SIZES } from '@/constants';

export const CharacterRow = ({ character, onPress }: CharacterRowProps) => {
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(character.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const deleteCharacter = useDeletedStore((state) => state.deleteCharacter);

  const handlePress = () => onPress(character);
  const handleToggleFavorite = () => toggleFavorite(character.id);
  const handleDelete = () => deleteCharacter(character.id);

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleDelete}
      accessibilityRole="button"
      accessibilityLabel={`${character.name}, ${character.species}`}
      accessibilityHint="Long press to remove this character from the list"
      className="flex-row items-center border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 active:bg-primary-100 dark:active:bg-gray-800"
    >
      <RemoteImage source={{ uri: character.image }} className="h-10 w-10 rounded-full" />
      <View className="ml-4 flex-1">
        <Text className="text-base font-semibold text-gray-800 dark:text-gray-200">{character.name}</Text>
        <Text className="text-sm text-gray-400 dark:text-gray-500">{character.species}</Text>
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
        <AnimatedHeart characterId={character.id} isFavorite={isFavorite} size={ICON_SIZES.row} />
      </Pressable>
    </Pressable>
  );
};
