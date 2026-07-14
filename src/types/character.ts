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

export interface CharactersQueryData {
  characters: {
    info: { next: number | null };
    results: Character[];
  };
}

export interface CharacterQueryData {
  character: CharacterDetail;
}
