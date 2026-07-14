import type { Character, Filters } from '@/interfaces/character';

export interface CharacterRowProps {
  character: Character;
  onPress: (character: Character) => void;
}

export interface SectionHeaderProps {
  title: string;
  count: number;
}

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onPressFilters: () => void;
  activeFilterCount: number;
}

export interface DeletedBannerProps {
  count: number;
  onRestore: () => void;
}

export interface FilterModalProps {
  visible: boolean;
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

export interface FilterOptionProps<T extends string> {
  option: T;
  isSelected: boolean;
  label: string;
  groupLabel: string;
  onSelect: (option: T) => void;
}

export interface FilterGroupProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
}

export interface DetailFieldProps {
  label: string;
  value: string;
}

export interface CommentInputProps {
  onSubmit: (text: string) => void;
}
