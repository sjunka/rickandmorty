import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { AdvancedSearchHeaderProps } from '@/interfaces/components';
import { COLORS, ICON_SIZES } from '@/constants';

export const AdvancedSearchHeader = ({ onBack, onDone }: AdvancedSearchHeaderProps) => (
  <View className="flex-row items-center px-4 py-3">
    <Pressable
      onPress={onBack}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel="Back to filters"
    >
      <Ionicons name="arrow-back" size={ICON_SIZES.header} color={COLORS.primary} />
    </Pressable>
    <Text className="flex-1 text-center text-base font-semibold text-gray-900">
      Advanced search
    </Text>
    <Pressable onPress={onDone} hitSlop={8} accessibilityRole="button" accessibilityLabel="Done">
      <Text className="text-base font-semibold text-primary-600">Done</Text>
    </Pressable>
  </View>
);
