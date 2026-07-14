import { Ionicons } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';
import type { SearchBarProps } from '@/interfaces/components';

export const SearchBar = ({
  value,
  onChangeText,
  onPressFilters,
  activeFilterCount,
}: SearchBarProps) => (
  <View className="mx-4 mb-3 mt-2 flex-row items-center rounded-lg bg-gray-100 px-3 py-3">
    <Ionicons name="search" size={20} color="#9CA3AF" />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder="Search or filter results"
      placeholderTextColor="#9CA3AF"
      autoCorrect={false}
      accessibilityLabel="Search characters by name"
      className="ml-2 flex-1 p-0 text-base text-gray-800"
    />
    <Pressable
      onPress={onPressFilters}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={
        activeFilterCount > 0 ? `Filters, ${activeFilterCount} active` : 'Filters'
      }
    >
      <Ionicons
        name="options-outline"
        size={22}
        color={activeFilterCount > 0 ? '#7A56C0' : '#6B7280'}
      />
    </Pressable>
  </View>
);
