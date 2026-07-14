import { useCallback } from 'react';
import { Pressable, Text } from 'react-native';
import type { FilterOptionProps } from '@/interfaces/components';

/**
 * A single pill. It owns the press handler so the parent never has to build a
 * new closure per option while rendering.
 */
export const FilterOption = <T extends string>({
  option,
  isSelected,
  label,
  groupLabel,
  onSelect,
}: FilterOptionProps<T>) => {
  const handlePress = useCallback(() => onSelect(option), [onSelect, option]);

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`${groupLabel}: ${label}`}
      className={`min-w-[30%] flex-1 rounded-lg border px-3 py-3 ${
        isSelected ? 'border-primary-100 bg-primary-100 dark:border-primary-700 dark:bg-primary-700' : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
      }`}
    >
      <Text
        numberOfLines={1}
        className={`text-center text-sm ${
          isSelected ? 'font-semibold text-primary-700 dark:text-primary-100' : 'text-gray-700 dark:text-gray-300'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};
