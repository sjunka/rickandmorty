import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { FilterHeaderProps } from '@/interfaces/components';

export const FilterHeader = ({ onClose }: FilterHeaderProps) => (
  <View className="flex-row items-center px-4 py-3">
    <Pressable
      onPress={onClose}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Close filters"
    >
      <Ionicons name="arrow-back" size={24} color="#7A56C0" />
    </Pressable>
    <Text className="flex-1 text-center text-base font-semibold text-gray-900">Filters</Text>
    <View className="w-6" />
  </View>
);
