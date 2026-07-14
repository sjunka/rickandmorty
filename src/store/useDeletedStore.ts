import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

/**
 * Soft delete: characters are hidden from the list but kept in the store,
 * so removing one is always reversible.
 */
interface DeletedState {
  deletedIds: string[];
  deleteCharacter: (id: string) => void;
  restoreCharacter: (id: string) => void;
  restoreAll: () => void;
}

export const useDeletedStore = create<DeletedState>()(
  persist(
    (set) => ({
      deletedIds: [],
      deleteCharacter: (id) =>
        set((state) =>
          state.deletedIds.includes(id)
            ? state
            : { deletedIds: [...state.deletedIds, id] }
        ),
      restoreCharacter: (id) =>
        set((state) => ({
          deletedIds: state.deletedIds.filter((deletedId) => deletedId !== id),
        })),
      restoreAll: () => set({ deletedIds: [] }),
    }),
    {
      name: 'deleted-characters',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
