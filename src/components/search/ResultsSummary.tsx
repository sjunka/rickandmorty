import { Text, View } from 'react-native';
import type { ResultsSummaryProps } from '@/interfaces/components';

export const ResultsSummary = ({ resultCount, filterCount }: ResultsSummaryProps) => (
  <View className="flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800 px-4 py-3">
    <Text className="text-base font-semibold text-primary-600 dark:text-primary-100">
      {resultCount} Result{resultCount === 1 ? '' : 's'}
    </Text>
    <View className="rounded-full bg-secondary-600/25 dark:bg-secondary-600/30 px-3 py-1">
      <Text className="text-xs font-semibold text-gray-700 dark:text-gray-300">
        {filterCount} Filter{filterCount === 1 ? '' : 's'}
      </Text>
    </View>
  </View>
);
