import { StatusBar } from 'expo-status-bar';
import { ApolloProvider } from '@apollo/client/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { apolloClient } from '@/services/apollo';
import { HomeScreen } from '@/screens/HomeScreen';
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
              headerTintColor: '#7A56C0',
              headerTitleStyle: { color: '#111827' },
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
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
