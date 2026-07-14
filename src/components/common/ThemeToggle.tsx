import { Appearance, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ICON_SIZES } from '@/constants';
import { useThemeColors } from '@/hooks/useThemeColors';

/**
 * Switches the app between light and dark. Appearance.setColorScheme overrides
 * the system scheme app-wide, so everything reading useColorScheme follows.
 */
export const ThemeToggle = () => {
  const scheme = useColorScheme();
  const colors = useThemeColors();
  const isDark = scheme === 'dark';

  const toggle = () => Appearance.setColorScheme(isDark ? 'light' : 'dark');

  return (
    <Pressable
      onPress={toggle}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={ICON_SIZES.search} color={colors.iconIdle} />
    </Pressable>
  );
};
