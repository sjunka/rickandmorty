import { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { AnimatedHeartProps } from '@/interfaces/components';
import { useFavoritesStore } from '@/store/useFavoritesStore';

/**
 * How recent the favorited event has to be for the heart to pop. Old events
 * are ignored so a starred row scrolling back into view does not pop again.
 */
const POP_WINDOW_MS = 800;

/** The favorite heart, with a small spring pop when it turns on. */
export const AnimatedHeart = ({ characterId, isFavorite, size }: AnimatedHeartProps) => {
  const colors = useThemeColors();
  const scale = useSharedValue(1);

  // Animate from the store event rather than the prop: favoriting moves the
  // row into the starred section, which remounts this component, so a
  // prop-change guard would swallow every pop after the first.
  const lastFavorited = useFavoritesStore((state) => state.lastFavorited);

  useEffect(() => {
    const isMine = lastFavorited?.id === characterId;
    const isFresh = lastFavorited !== null && Date.now() - lastFavorited.at < POP_WINDOW_MS;
    if (isMine && isFresh) {
      scale.set(
        withSequence(
          withSpring(1.4, { damping: 12, stiffness: 400 }),
          withSpring(1, { damping: 14, stiffness: 300 })
        )
      );
    }
  }, [lastFavorited, characterId, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? colors.secondary : colors.heartOff}
      />
    </Animated.View>
  );
};
