// Reanimated and Worklets run on a native thread that does not exist under Jest.
jest.mock('react-native-worklets', () => require('react-native-worklets/lib/module/mock'));
require('react-native-reanimated').setUpTests();

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// The icon font loader pulls in native modules that do not exist under Jest.
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return { Ionicons: (props: { name: string }) => <Text>{props.name}</Text> };
});
