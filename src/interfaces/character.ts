import type {
  CharacterKind,
  GenderFilter,
  SpeciesFilter,
  StatusFilter,
} from '@/types/filters';

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

export interface CharacterSection {
  title: string;
  data: Character[];
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
