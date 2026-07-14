import { render, waitFor } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from '@/screens/HomeScreen';
import { GET_CHARACTERS } from '@/services/queries';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { RootStackParamList } from '@/types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const charactersMock = {
  request: { query: GET_CHARACTERS, variables: { page: 1, filter: {} } },
  result: {
    data: {
      characters: {
        info: { next: 2 },
        results: [
          {
            id: '1',
            name: 'Rick Sanchez',
            image: 'https://example.com/rick.png',
            species: 'Human',
            status: 'Alive',
            gender: 'Male',
          },
          {
            id: '2',
            name: 'Abadango Cluster Princess',
            image: 'https://example.com/abadango.png',
            species: 'Alien',
            status: 'Alive',
            gender: 'Female',
          },
        ],
      },
    },
  },
};

const navigation = { navigate: jest.fn(), setParams: jest.fn() };
const props = { navigation, route: { params: undefined } } as unknown as NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

const renderHomeScreen = () =>
  // RNTL 14 renders asynchronously, so this resolves to the queries.
  render(
    <MockedProvider mocks={[charactersMock]}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <HomeScreen {...props} />
      </SafeAreaProvider>
    </MockedProvider>
  );

beforeEach(() => {
  useFavoritesStore.setState({ favoriteIds: [] });
  useDeletedStore.setState({ deletedIds: [] });
});

describe('HomeScreen', () => {
  it('renders the characters returned by the query', async () => {
    const { findByText, getByText } = await renderHomeScreen();

    expect(await findByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Abadango Cluster Princess')).toBeTruthy();
    expect(getByText('Characters (2)')).toBeTruthy();
  });

  it('puts favorites in their own section', async () => {
    useFavoritesStore.setState({ favoriteIds: ['1'] });
    const { getByText } = await renderHomeScreen();

    await waitFor(() => expect(getByText('Starred Characters (1)')).toBeTruthy());
    expect(getByText('Characters (1)')).toBeTruthy();
  });

  it('hides soft deleted characters from the list', async () => {
    useDeletedStore.setState({ deletedIds: ['1'] });
    const { findByText, queryByText, getByText } = await renderHomeScreen();

    expect(await findByText('Abadango Cluster Princess')).toBeTruthy();
    expect(queryByText('Rick Sanchez')).toBeNull();
    expect(getByText('1 character removed')).toBeTruthy();
  });
});
