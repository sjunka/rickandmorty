import { ActivityIndicator } from 'react-native';
import { COLORS } from '@/constants';

export const FullScreenLoader = () => <ActivityIndicator className="flex-1 bg-white" color={COLORS.primary} />;
