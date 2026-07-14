import { Pressable, Text, View } from 'react-native';

interface DeletedBannerProps {
  count: number;
  onRestore: () => void;
}

/** Makes the soft delete visible and reversible. */
export const DeletedBanner = ({ count, onRestore }: DeletedBannerProps) => {
  if (count === 0) return null;

  return (
    <View className="mx-4 mb-2 flex-row items-center justify-between rounded-lg bg-primary-100 px-3 py-2">
      <Text className="text-sm text-primary-700">
        {count} character{count > 1 ? 's' : ''} removed
      </Text>
      <Pressable onPress={onRestore} hitSlop={8} accessibilityRole="button">
        <Text className="text-sm font-semibold text-primary-600">Restore</Text>
      </Pressable>
    </View>
  );
};
