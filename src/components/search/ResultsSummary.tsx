import { Text, View } from 'react-native';
import type { ResultsSummaryProps } from '@/interfaces/components';

export const ResultsSummary = ({ resultCount, filterCount }: ResultsSummaryProps) => (
  <View className="flex-row items-center justify-between border-b border-gray-100 px-4 py-3">
    <Text className="text-base font-semibold text-primary-600">
      {resultCount} Result{resultCount === 1 ? '' : 's'}
    </Text>
    <View className="rounded-full bg-secondary-600/25 px-3 py-1">
      <Text className="text-xs font-semibold text-gray-700">
        {filterCount} Filter{filterCount === 1 ? '' : 's'}
      </Text>
    </View>
  </View>
);
