import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/useThemeColors';
import type { AnimatedHeartProps } from '@/interfaces/components';

/** The favorite heart, with a small spring pop when it turns on. */
export const AnimatedHeart = ({ isFavorite, size }: AnimatedHeartProps) => {
  const colors = useThemeColors();
  const scale = useSharedValue(1);
  const mounted = useRef(false);

  useEffect(() => {
    // Skip the initial render, so persisted favorites don't pop on mount.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (isFavorite) {
      scale.set(
        withSequence(
          withSpring(1.4, { damping: 12, stiffness: 400 }),
          withSpring(1, { damping: 14, stiffness: 300 })
        )
      );
    }
  }, [isFavorite, scale]);

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
