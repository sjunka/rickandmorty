import { Text, View } from 'react-native';
import type { FullScreenMessageProps } from '@/interfaces/components';

/** Fills a screen that has nothing else to show, such as a failed detail query. */
export const FullScreenMessage = ({ message }: FullScreenMessageProps) => (
  <View className="flex-1 items-center justify-center bg-white px-8">
    <Text className="text-center text-gray-500">{message}</Text>
  </View>
);
