import { fireEvent, render } from '@testing-library/react-native';
import { MockedProvider } from '@apollo/client/testing/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AdvancedSearchScreen } from '@/screens/AdvancedSearchScreen';
import { GET_CHARACTERS } from '@/services/queries';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useFiltersStore } from '@/store/useFiltersStore';
import type { Filters } from '@/interfaces/character';
import type { RootStackParamList } from '@/types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const filters: Filters = { kind: 'all', species: 'Human', status: 'all', gender: 'all' };

const charactersMock = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1, filter: { species: 'Human' } },
  },
  result: {
    data: {
      characters: {
        info: { next: null },
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
            name: 'Beth Smith',
            image: 'https://example.com/beth.png',
            species: 'Human',
            status: 'Alive',
            gender: 'Female',
          },
        ],
      },
    },
  },
};

const navigation = { navigate: jest.fn(), goBack: jest.fn() };
const props = {
  navigation,
  route: { params: { search: '' } },
} as unknown as NativeStackScreenProps<RootStackParamList, 'AdvancedSearch'>;

const renderScreen = () =>
  render(
    <MockedProvider mocks={[charactersMock]}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <AdvancedSearchScreen {...props} />
      </SafeAreaProvider>
    </MockedProvider>
  );

beforeEach(() => {
  useFavoritesStore.setState({ favoriteIds: [] });
  useDeletedStore.setState({ deletedIds: [] });
  useFiltersStore.setState({ filters });
  navigation.navigate.mockClear();
  navigation.goBack.mockClear();
});

describe('AdvancedSearchScreen', () => {
  it('shows the result count and the number of active filters', async () => {
    const { findByText, getByText } = await renderScreen();

    expect(await findByText('2 Results')).toBeTruthy();
    expect(getByText('1 Filter')).toBeTruthy();
  });

  it('lists the characters matching the filters', async () => {
    const { findByText, getByText } = await renderScreen();

    expect(await findByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Beth Smith')).toBeTruthy();
  });

  it('reopens the filters when going back', async () => {
    const { getByLabelText } = await renderScreen();

    fireEvent.press(getByLabelText('Back to filters'));

    expect(navigation.navigate).toHaveBeenCalledWith('Home', { reopenFilters: true });
  });

  it('returns to the list without the filters when done', async () => {
    const { getByLabelText } = await renderScreen();

    fireEvent.press(getByLabelText('Done'));

    expect(navigation.navigate).toHaveBeenCalledWith('Home');
  });
});
