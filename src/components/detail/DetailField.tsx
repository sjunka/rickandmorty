import { Text, View } from 'react-native';
import type { DetailFieldProps } from '@/interfaces/components';

export const DetailField = ({ label, value }: DetailFieldProps) => (
  <View className="border-b border-gray-100 py-3">
    <Text className="text-base font-semibold text-gray-800">{label}</Text>
    <Text className="text-base text-gray-400">{value}</Text>
  </View>
);
