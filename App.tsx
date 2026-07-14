import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '@/constants';
import { apolloClient } from '@/services/apollo';
import { HomeScreen } from '@/screens/HomeScreen';
import { AdvancedSearchScreen } from '@/screens/AdvancedSearchScreen';
import { CharacterDetailScreen } from '@/screens/CharacterDetailScreen';
import type { RootStackParamList } from '@/types/navigation';
import './global.css';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator
            screenOptions={{
              headerTintColor: COLORS.primary,
              headerTitleStyle: { color: COLORS.textPrimary },
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
