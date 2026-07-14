import { Pressable, Text, View } from 'react-native';
import type { DeletedBannerProps } from '@/interfaces/components';

/** Makes the soft delete visible and reversible. */
export const DeletedBanner = ({ count, onRestore }: DeletedBannerProps) => {
  if (count === 0) return null;

  return (
    <View className="mx-4 mb-2 flex-row items-center justify-between rounded-lg bg-primary-100 dark:bg-primary-700 px-3 py-2">
      <Text className="text-sm text-primary-700 dark:text-primary-100">
        {count} character{count > 1 ? 's' : ''} removed
      </Text>
      <Pressable onPress={onRestore} hitSlop={8} accessibilityRole="button">
        <Text className="text-sm font-semibold text-primary-600 dark:text-primary-100">Restore</Text>
      </Pressable>
    </View>
  );
};
