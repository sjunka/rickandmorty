import { useCommentsStore } from '@/store/useCommentsStore';
import { useDeletedStore } from '@/store/useDeletedStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';

beforeEach(() => {
  useFavoritesStore.setState({ favoriteIds: [] });
  useDeletedStore.setState({ deletedIds: [] });
  useCommentsStore.setState({ commentsByCharacter: {} });
});

describe('useFavoritesStore', () => {
  it('adds and removes a favorite with the same toggle', () => {
    useFavoritesStore.getState().toggleFavorite('1');
    expect(useFavoritesStore.getState().favoriteIds).toEqual(['1']);

    useFavoritesStore.getState().toggleFavorite('1');
    expect(useFavoritesStore.getState().favoriteIds).toEqual([]);
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
