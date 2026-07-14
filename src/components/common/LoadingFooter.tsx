import { ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants';

/** The spinner shown under a list while the next page loads. */
export const LoadingFooter = () => <ActivityIndicator className="py-6" color={COLORS.primary} />;
