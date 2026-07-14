jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// The icon font loader pulls in native modules that do not exist under Jest.
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return { Ionicons: (props: { name: string }) => <Text>{props.name}</Text> };
});
