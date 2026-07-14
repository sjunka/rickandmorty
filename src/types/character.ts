export interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
}

export interface CharacterDetail extends Character {
  type: string;
  origin: { name: string };
  location: { name: string };
}

export interface Comment {
  id: string;
  text: string;
  createdAt: number;
}

export type SortDirection = 'asc' | 'desc';

export type CharacterKind = 'all' | 'starred' | 'others';
export type SpeciesFilter = 'all' | 'Human' | 'Alien';
export type StatusFilter = 'all' | 'Alive' | 'Dead' | 'unknown';
export type GenderFilter = 'all' | 'Male' | 'Female' | 'Genderless' | 'unknown';

export interface Filters {
  kind: CharacterKind;
  species: SpeciesFilter;
  status: StatusFilter;
  gender: GenderFilter;
}

/** Filter arguments the API understands. `kind` is applied client-side. */
export interface ApiFilter {
  name?: string;
  species?: string;
  status?: string;
  gender?: string;
}

export interface CharactersQueryData {
  characters: {
    info: { next: number | null };
    results: Character[];
  };
}

export interface CharacterQueryData {
  character: CharacterDetail;
}
