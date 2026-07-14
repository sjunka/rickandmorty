import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { FilterHeaderProps } from '@/interfaces/components';
import { ICON_SIZES } from '@/constants';
import { useThemeColors } from '@/hooks/useThemeColors';

export const FilterHeader = ({ onClose }: FilterHeaderProps) => {
  const colors = useThemeColors();
  return (
  <View className="flex-row items-center px-4 py-3">
    <Pressable
      onPress={onClose}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Close filters"
    >
      <Ionicons name="arrow-back" size={ICON_SIZES.header} color={colors.primary} />
    </Pressable>
    <Text className="flex-1 text-center text-base font-semibold text-gray-900 dark:text-gray-100">Filters</Text>
    <View className="w-6" />
  </View>
);
};
