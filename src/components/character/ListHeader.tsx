import { Pressable, Text, View } from 'react-native';
import { ThemeToggle } from '@/components/common';
import type { ListHeaderProps } from '@/interfaces/components';

/** The screen title, the theme toggle, and the A-Z / Z-A sort toggle. */
export const ListHeader = ({ sortDirection, onToggleSort }: ListHeaderProps) => (
  <View className="flex-row items-center justify-between px-4 pb-1 pt-4">
    <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100">Rick and Morty list</Text>
    <View className="flex-row items-center gap-3">
      <ThemeToggle />
      <Pressable
        onPress={onToggleSort}
        accessibilityRole="button"
        accessibilityLabel={`Sort by name, currently ${
          sortDirection === 'asc' ? 'A to Z' : 'Z to A'
        }`}
        className="rounded-full bg-primary-100 dark:bg-primary-700 px-3 py-1"
      >
        <Text className="text-sm font-semibold text-primary-600 dark:text-primary-100">
          {sortDirection === 'asc' ? 'A-Z' : 'Z-A'}
        </Text>
      </Pressable>
    </View>
  </View>
);
