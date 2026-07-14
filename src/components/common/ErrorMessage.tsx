import { Text } from 'react-native';
import type { ErrorMessageProps } from '@/interfaces/components';

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <Text className="px-4 py-2 text-sm text-red-500">{message}</Text>
);
