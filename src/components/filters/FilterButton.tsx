import { Pressable, Text } from 'react-native';
import type { FilterButtonProps } from '@/interfaces/components';

/** The apply button, disabled until at least one filter is picked. */
export const FilterButton = ({ enabled, onPress }: FilterButtonProps) => (
  <Pressable
    onPress={onPress}
    disabled={!enabled}
    accessibilityRole="button"
    accessibilityState={{ disabled: !enabled }}
    accessibilityLabel="Apply filters"
    className={`rounded-lg py-4 ${enabled ? 'bg-primary-600 active:bg-primary-700 dark:active:bg-primary-600' : 'bg-gray-100 dark:bg-gray-800'}`}
  >
    <Text
      className={`text-center text-base font-semibold ${
        enabled ? 'text-white' : 'text-gray-400 dark:text-gray-500'
      }`}
    >
      Filter
    </Text>
  </Pressable>
);
