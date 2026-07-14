import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client/react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { apolloClient } from '@/services/apollo';
import { useThemeColors } from '@/hooks/useThemeColors';
import { HomeScreen } from '@/screens/HomeScreen';
import { AdvancedSearchScreen } from '@/screens/AdvancedSearchScreen';
import { CharacterDetailScreen } from '@/screens/CharacterDetailScreen';
import type { RootStackParamList } from '@/types/navigation';
import './global.css';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const scheme = useColorScheme();
  const colors = useThemeColors();

  return (
    <SafeAreaProvider>
      <ApolloProvider client={apolloClient}>
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style="auto" />
          <Stack.Navigator
            screenOptions={{
              headerTintColor: colors.primary,
              headerTitleStyle: { color: colors.textPrimary },
              headerStyle: { backgroundColor: colors.background },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name="AdvancedSearch"
              component={AdvancedSearchScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CharacterDetail"
              component={CharacterDetailScreen}
              options={{ title: '' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default App;
