import { Image, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { CharacterAvatarProps } from '@/interfaces/components';

/** The detail image with the favorite heart pinned to its corner. */
export const CharacterAvatar = ({ image, isFavorite, onToggleFavorite }: CharacterAvatarProps) => (
  <View className="mt-2 self-start">
    <Image source={{ uri: image }} className="h-20 w-20 rounded-full" />
    <Pressable
      onPress={onToggleFavorite}
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
);
