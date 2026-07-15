import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/constants';

/**
 * The last "became a favorite" event. The heart animates from this rather
 * than from watching its own prop, because favoriting moves the row into the
 * starred section, which remounts the component and loses any local state.
 */
interface FavoritedEvent {
  id: string;
  at: number;
}

interface FavoritesState {
  favoriteIds: string[];
  lastFavorited: FavoritedEvent | null;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      lastFavorited: null,
      isFavorite: (id) => get().favoriteIds.includes(id),
      toggleFavorite: (id) =>
        set((state) => {
          const removing = state.favoriteIds.includes(id);
          return {
            favoriteIds: removing
              ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
              : [...state.favoriteIds, id],
            lastFavorited: removing ? state.lastFavorited : { id, at: Date.now() },
          };
        }),
    }),
    {
      name: STORAGE_KEYS.favorites,
      storage: createJSONStorage(() => AsyncStorage),
      // The animation event is transient; only the ids need to survive restarts.
      partialize: (state) => ({ favoriteIds: state.favoriteIds }),
    }
  )
);
