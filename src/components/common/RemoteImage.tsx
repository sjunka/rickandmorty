import { Image } from 'expo-image';
import { styled } from 'nativewind';

/**
 * expo-image registered with NativeWind. Third-party components are not
 * styled automatically, so a plain expo-image would silently drop className.
 */
export const RemoteImage = styled(Image, { className: 'style' });
