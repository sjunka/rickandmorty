import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { AdvancedSearchHeaderProps } from '@/interfaces/components';
import { ICON_SIZES } from '@/constants';
import { useThemeColors } from '@/hooks/useThemeColors';

export const AdvancedSearchHeader = ({ onBack, onDone }: AdvancedSearchHeaderProps) => {
  const colors = useThemeColors();
  return (
  <View className="flex-row items-center px-4 py-3">
    <Pressable
      onPress={onBack}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Back to filters"
    >
      <Ionicons name="arrow-back" size={ICON_SIZES.header} color={colors.primary} />
    </Pressable>
    <Text className="flex-1 text-center text-base font-semibold text-gray-900 dark:text-gray-100">
      Advanced search
    </Text>
    <Pressable onPress={onDone} hitSlop={8} accessibilityRole="button" accessibilityLabel="Done">
      <Text className="text-base font-semibold text-primary-600 dark:text-primary-100">Done</Text>
    </Pressable>
  </View>
);
};
