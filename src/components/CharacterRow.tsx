import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { Character } from '@/types/character';

interface CharacterRowProps {
  character: Character;
  onPress: () => void;
}

export const CharacterRow = ({ character, onPress }: CharacterRowProps) => {
  const isFavorite = useFavoritesStore((state) => state.favoriteIds.includes(character.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${character.name}, ${character.species}`}
      className="flex-row items-center border-b border-gray-100 bg-white px-4 py-3 active:bg-primary-100"
    >
      <Image source={{ uri: character.image }} className="h-10 w-10 rounded-full" />
      <View className="ml-4 flex-1">
        <Text className="text-base font-semibold text-gray-800">{character.name}</Text>
        <Text className="text-sm text-gray-400">{character.species}</Text>
      </View>
      <Pressable
        onPress={() => toggleFavorite(character.id)}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite ? `Remove ${character.name} from favorites` : `Add ${character.name} to favorites`
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
