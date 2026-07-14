/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type FilterCharacter = {
  gender?: string | null | undefined;
  name?: string | null | undefined;
  species?: string | null | undefined;
  status?: string | null | undefined;
  type?: string | null | undefined;
};

export type CharactersQueryVariables = Exact<{
  page?: number | null | undefined;
  filter?: FilterCharacter | null | undefined;
}>;


export type CharactersQuery = { characters: { info: { next: number | null } | null, results: Array<{ id: string | null, name: string | null, image: string | null, species: string | null, status: string | null, gender: string | null } | null> | null } | null };

export type CharacterQueryVariables = Exact<{
  id: string | number;
}>;


export type CharacterQuery = { character: { id: string | null, name: string | null, image: string | null, species: string | null, status: string | null, gender: string | null, type: string | null, origin: { name: string | null } | null, location: { name: string | null } | null } | null };
