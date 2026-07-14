export type RootStackParamList = {
  /** `reopenFilters` brings the filter modal back up when returning from advanced search. */
  Home: { reopenFilters?: boolean } | undefined;
  AdvancedSearch: { search: string };
  CharacterDetail: { id: string; name: string };
};
