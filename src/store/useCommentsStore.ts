import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Comment } from '@/types/character';

interface CommentsState {
  commentsByCharacter: Record<string, Comment[]>;
  addComment: (characterId: string, text: string) => void;
}

export const useCommentsStore = create<CommentsState>()(
  persist(
    (set) => ({
      commentsByCharacter: {},
      addComment: (characterId, text) =>
        set((state) => ({
          commentsByCharacter: {
            ...state.commentsByCharacter,
            [characterId]: [
              ...(state.commentsByCharacter[characterId] ?? []),
              {
                id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                text,
                createdAt: Date.now(),
              },
            ],
          },
        })),
    }),
    {
      name: 'comments',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
