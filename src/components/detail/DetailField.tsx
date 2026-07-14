import { Text, View } from 'react-native';
import type { DetailFieldProps } from '@/interfaces/components';

export const DetailField = ({ label, value }: DetailFieldProps) => (
  <View className="border-b border-gray-100 dark:border-gray-800 py-3">
    <Text className="text-base font-semibold text-gray-800 dark:text-gray-200">{label}</Text>
    <Text className="text-base text-gray-400 dark:text-gray-500">{value}</Text>
  </View>
);
