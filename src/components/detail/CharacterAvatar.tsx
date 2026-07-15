import { Pressable, View } from 'react-native';
import { AnimatedHeart, RemoteImage } from '@/components/common';
import type { CharacterAvatarProps } from '@/interfaces/components';
import { ICON_SIZES } from '@/constants';

/** The detail image with the favorite heart pinned to its corner. */
export const CharacterAvatar = ({ characterId, image, isFavorite, onToggleFavorite }: CharacterAvatarProps) => (
  <View className="mt-2 self-start">
    <RemoteImage source={{ uri: image }} className="h-20 w-20 rounded-full" />
    <Pressable
      onPress={onToggleFavorite}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      className="absolute -bottom-1 -right-1 rounded-full bg-white dark:bg-gray-900 p-1"
    >
      <AnimatedHeart characterId={characterId} isFavorite={isFavorite} size={ICON_SIZES.badge} />
    </Pressable>
  </View>
);
