import { Text } from 'react-native';
import type { EmptyStateProps } from '@/interfaces/components';

export const EmptyState = ({ message }: EmptyStateProps) => (
  <Text className="px-4 py-8 text-center text-gray-400 dark:text-gray-500">{message}</Text>
);
