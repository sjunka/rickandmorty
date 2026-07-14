import { useColorScheme } from 'react-native';
import { COLORS, COLORS_DARK } from '@/constants';

/**
 * The color values for the current scheme, for props that take a color
 * (icons, spinners, navigator options). Tailwind classes use dark: variants
 * instead.
 */
export function useThemeColors(): typeof COLORS {
  return useColorScheme() === 'dark' ? COLORS_DARK : COLORS;
}
