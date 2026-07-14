import type {
  Character,
  CharacterDetail,
  CharacterSection,
  Comment,
  Filters,
} from '@/interfaces/character';
import type { SortDirection } from '@/types/filters';

/* Shared */

export interface EmptyStateProps {
  message: string;
}

export interface ErrorMessageProps {
  message: string;
}

export interface FullScreenMessageProps {
  message: string;
}

/* Character list */

export interface ListHeaderProps {
  sortDirection: SortDirection;
  onToggleSort: () => void;
}

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

/* Search */

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onPressFilters: () => void;
  activeFilterCount: number;
}

export interface AdvancedSearchHeaderProps {
  onBack: () => void;
  onDone: () => void;
}

export interface ResultsSummaryProps {
  resultCount: number;
  filterCount: number;
}

/* Filters */

export interface FilterModalProps {
  visible: boolean;
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

export interface FilterHeaderProps {
  onClose: () => void;
}

export interface FilterButtonProps {
  enabled: boolean;
  onPress: () => void;
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

/* Character detail */

export interface CharacterAvatarProps {
  image: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export interface CharacterFieldsProps {
  character: CharacterDetail;
}

export interface DetailFieldProps {
  label: string;
  value: string;
}

export interface CommentListProps {
  comments: Comment[];
}

export interface CommentInputProps {
  onSubmit: (text: string) => void;
}
