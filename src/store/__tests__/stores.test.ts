import { useCommentsStore } from '@/store/useCommentsStore';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useFiltersStore } from '@/store/useFiltersStore';
import { EMPTY_FILTERS } from '@/utils/filters';

beforeEach(() => {
  useFavoritesStore.setState({ favoriteIds: [], lastFavorited: null });
  useDeletedStore.setState({ deletedIds: [] });
  useCommentsStore.setState({ commentsByCharacter: {} });
  useFiltersStore.setState({ filters: EMPTY_FILTERS });
});

describe('useFiltersStore', () => {
  it('keeps the applied filters so the modal can reopen on them', () => {
    useFiltersStore.getState().setFilters({ ...EMPTY_FILTERS, species: 'Alien', status: 'Dead' });

    expect(useFiltersStore.getState().filters).toEqual({
      kind: 'all',
      species: 'Alien',
      status: 'Dead',
      gender: 'all',
    });
  });

  it('clears back to no filters', () => {
    useFiltersStore.getState().setFilters({ ...EMPTY_FILTERS, gender: 'Female' });
    useFiltersStore.getState().clearFilters();

    expect(useFiltersStore.getState().filters).toEqual(EMPTY_FILTERS);
  });
});

describe('useFavoritesStore', () => {
  it('adds and removes a favorite with the same toggle', () => {
    useFavoritesStore.getState().toggleFavorite('1');
    expect(useFavoritesStore.getState().favoriteIds).toEqual(['1']);

    useFavoritesStore.getState().toggleFavorite('1');
    expect(useFavoritesStore.getState().favoriteIds).toEqual([]);
  });

  it('records a fresh favorited event every time a character is added', () => {
    useFavoritesStore.getState().toggleFavorite('1');
    const first = useFavoritesStore.getState().lastFavorited;
    expect(first?.id).toBe('1');

    // Un-favoriting keeps the last event; re-favoriting emits a new one.
    useFavoritesStore.getState().toggleFavorite('1');
    expect(useFavoritesStore.getState().lastFavorited).toBe(first);

    useFavoritesStore.getState().toggleFavorite('1');
    const second = useFavoritesStore.getState().lastFavorited;
    expect(second?.id).toBe('1');
    expect(second).not.toBe(first);
  });
});

describe('useDeletedStore', () => {
  it('soft deletes a character and restores it', () => {
    useDeletedStore.getState().deleteCharacter('7');
    expect(useDeletedStore.getState().deletedIds).toEqual(['7']);

    useDeletedStore.getState().restoreCharacter('7');
    expect(useDeletedStore.getState().deletedIds).toEqual([]);
  });

  it('does not add the same character twice', () => {
    useDeletedStore.getState().deleteCharacter('7');
    useDeletedStore.getState().deleteCharacter('7');

    expect(useDeletedStore.getState().deletedIds).toEqual(['7']);
  });

  it('restores every deleted character at once', () => {
    useDeletedStore.getState().deleteCharacter('1');
    useDeletedStore.getState().deleteCharacter('2');
    useDeletedStore.getState().restoreAll();

    expect(useDeletedStore.getState().deletedIds).toEqual([]);
  });
});

describe('useCommentsStore', () => {
  it('stores comments per character in the order they were added', () => {
    useCommentsStore.getState().addComment('1', 'First');
    useCommentsStore.getState().addComment('1', 'Second');
    useCommentsStore.getState().addComment('2', 'Other character');

    const { commentsByCharacter } = useCommentsStore.getState();
    expect(commentsByCharacter['1'].map((comment) => comment.text)).toEqual(['First', 'Second']);
    expect(commentsByCharacter['2']).toHaveLength(1);
  });

  it('gives each comment a unique id', () => {
    useCommentsStore.getState().addComment('1', 'One');
    useCommentsStore.getState().addComment('1', 'Two');

    const ids = useCommentsStore.getState().commentsByCharacter['1'].map((comment) => comment.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
