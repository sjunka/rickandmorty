import { ActivityIndicator } from 'react-native';
import { useThemeColors } from '@/hooks/useThemeColors';

/** The spinner shown under a list while the next page loads. */
export const LoadingFooter = () => {
  const colors = useThemeColors();
  return <ActivityIndicator className="py-6" color={colors.primary} />;
};
