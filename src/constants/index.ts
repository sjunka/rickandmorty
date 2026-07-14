/** The GraphQL endpoint everything is fetched from. */
export const GRAPHQL_URL = 'https://rickandmortyapi.com/graphql';

/**
 * The Figma palette, for props that take a color value (icons, spinners).
 * Tailwind classes read the same tokens from global.css.
 */
interface ColorPalette {
  primary: string;
  secondary: string;
  textPrimary: string;
  iconIdle: string;
  iconMuted: string;
  heartOff: string;
  background: string;
}

export const COLORS: ColorPalette = {
  primary: '#7A56C0',
  secondary: '#82D554',
  textPrimary: '#111827',
  iconIdle: '#6B7280',
  iconMuted: '#9CA3AF',
  heartOff: '#D1D5DB',
  background: '#FFFFFF',
};

/** The same roles on a dark background. */
export const COLORS_DARK: ColorPalette = {
  primary: '#A98FDC',
  secondary: '#82D554',
  textPrimary: '#F9FAFB',
  iconIdle: '#9CA3AF',
  iconMuted: '#6B7280',
  heartOff: '#4B5563',
  background: '#111827',
} as const;

export const ICON_SIZES = {
  header: 24,
  row: 24,
  search: 20,
  badge: 20,
} as const;

/** How long to wait after the last keystroke before searching. */
export const SEARCH_DEBOUNCE_MS = 350;

/** How close to the bottom of the list the next page starts loading. */
export const LIST_END_THRESHOLD = 0.5;

/** Keyboard offset for the comment input under the iOS navigation header. */
export const IOS_KEYBOARD_OFFSET = 90;

/** AsyncStorage keys for the persisted stores. */
export const STORAGE_KEYS = {
  favorites: 'favorites',
  comments: 'comments',
  deleted: 'deleted-characters',
} as const;

export const MESSAGES = {
  loadCharactersError: 'Could not load characters. Check your connection and try again.',
  loadDetailError: 'Could not load this character. Check your connection and try again.',
  emptyList: 'No characters match your search.',
  noComments: 'No comments yet. Add the first one.',
  commentPlaceholder: 'Write a comment...',
  searchPlaceholder: 'Search or filter results',
} as const;
