import type { Character, CharacterSection, Filters } from '@/interfaces/character';

/* Character list */

export interface CharacterRowProps {
  character: Character;
  onPress: (character: Character) => void;
}

export interface CharacterSectionListProps {
  sections: CharacterSection[];
  loading: boolean;
  onPressCharacter: (character: Character) => void;
  onEndReached: () => void;
}

export interface SectionHeaderProps {
  title: string;
  count: number;
}

export interface DeletedBannerProps {
  count: number;
  onRestore: () => void;
}

/* Search and filters */

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onPressFilters: () => void;
  activeFilterCount: number;
}

export interface FilterModalProps {
  visible: boolean;
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

export interface FilterGroupProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
}

export interface FilterOptionProps<T extends string> {
  option: T;
  isSelected: boolean;
  label: string;
  groupLabel: string;
  onSelect: (option: T) => void;
}

export interface ResultsSummaryProps {
  resultCount: number;
  filterCount: number;
}

/* Character detail */

export interface DetailFieldProps {
  label: string;
  value: string;
}

export interface CommentInputProps {
  onSubmit: (text: string) => void;
}
