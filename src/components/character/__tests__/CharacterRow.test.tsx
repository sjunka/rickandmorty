import { fireEvent, render } from '@testing-library/react-native';
import { CharacterRow } from '@/components/character/CharacterRow';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import type { Character } from '@/interfaces/character';

const rick: Character = {
  id: '1',
  name: 'Rick Sanchez',
  image: 'https://example.com/rick.png',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
};

beforeEach(() => {
  useFavoritesStore.setState({ favoriteIds: [] });
  useDeletedStore.setState({ deletedIds: [] });
});

describe('CharacterRow', () => {
  it('shows the name and species', async () => {
    const { getByText } = await render(<CharacterRow character={rick} onPress={jest.fn()} />);

    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Human')).toBeTruthy();
  });

  it('calls onPress when the row is tapped', async () => {
    const onPress = jest.fn();
    const { getByLabelText } = await render(<CharacterRow character={rick} onPress={onPress} />);

    fireEvent.press(getByLabelText('Rick Sanchez, Human'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('adds the character to favorites when the heart is tapped', async () => {
    const { getByLabelText, findByLabelText } = await render(
      <CharacterRow character={rick} onPress={jest.fn()} />
    );

    fireEvent.press(getByLabelText('Add Rick Sanchez to favorites'));

    expect(useFavoritesStore.getState().favoriteIds).toEqual(['1']);
    expect(await findByLabelText('Remove Rick Sanchez from favorites')).toBeTruthy();
  });

  it('soft deletes the character on long press', async () => {
    const { getByLabelText } = await render(<CharacterRow character={rick} onPress={jest.fn()} />);

    fireEvent(getByLabelText('Rick Sanchez, Human'), 'longPress');

    expect(useDeletedStore.getState().deletedIds).toEqual(['1']);
  });
});
