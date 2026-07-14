import { Text } from 'react-native';
import type { SectionHeaderProps } from '@/interfaces/components';

export const SectionHeader = ({ title, count }: SectionHeaderProps) => (
  <Text className="bg-white dark:bg-gray-900 px-4 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
    {title} ({count})
  </Text>
);
