import { Text } from 'react-native';

interface SectionHeaderProps {
  title: string;
  count: number;
}

export const SectionHeader = ({ title, count }: SectionHeaderProps) => (
  <Text className="bg-white px-4 pb-2 pt-5 text-xs font-semibold uppercase tracking-wider text-gray-400">
    {title} ({count})
  </Text>
);
