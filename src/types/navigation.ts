import type { Filters } from '@/interfaces/character';

export type RootStackParamList = {
  Home: undefined;
  AdvancedSearch: { filters: Filters; search: string };
  CharacterDetail: { id: string; name: string };
};
