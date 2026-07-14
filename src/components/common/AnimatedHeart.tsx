import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { COLORS } from '@/constants';
import type { AnimatedHeartProps } from '@/interfaces/components';

/** The favorite heart, with a small spring pop when it turns on. */
export const AnimatedHeart = ({ isFavorite, size }: AnimatedHeartProps) => {
  const scale = useSharedValue(1);
  const mounted = useRef(false);

  useEffect(() => {
    // Skip the initial render, so persisted favorites don't pop on mount.
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (isFavorite) {
      scale.value = withSequence(
        withSpring(1.4, { damping: 12, stiffness: 400 }),
        withSpring(1, { damping: 14, stiffness: 300 })
      );
    }
  }, [isFavorite, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={size}
        color={isFavorite ? COLORS.secondary : COLORS.heartOff}
      />
    </Animated.View>
  );
};
