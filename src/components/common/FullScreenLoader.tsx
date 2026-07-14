import { ActivityIndicator } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

export const FullScreenLoader = () => {
  const colors = useThemeColors();
  return <ActivityIndicator className="flex-1 bg-white dark:bg-gray-900" color={colors.primary} />;
};
