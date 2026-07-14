import type { Character, CharacterDetail } from '@/interfaces/character';
import type { CharacterQuery, CharactersQuery } from '@/services/graphql.generated';

/**
 * The generated types mirror the schema, where every field is nullable.
 * These mappers are the only place that deals with that: everything past
 * them works with the non-null domain interfaces.
 */

type ApiCharacter = NonNullable<NonNullable<NonNullable<CharactersQuery['characters']>['results']>[number]>;

function toCharacter(api: ApiCharacter): Character {
  return {
    id: api.id ?? '',
    name: api.name ?? 'Unknown',
    image: api.image ?? '',
    species: api.species ?? 'Unknown',
    status: api.status ?? 'unknown',
    gender: api.gender ?? 'unknown',
  };
}

export function toCharacters(data: CharactersQuery | undefined): Character[] {
  const results = data?.characters?.results ?? [];
  return results
    .filter((result): result is ApiCharacter => result !== null)
    .map(toCharacter);
}

export function toNextPage(data: CharactersQuery | undefined): number | null {
  return data?.characters?.info?.next ?? null;
}

export function toCharacterDetail(data: CharacterQuery | undefined): CharacterDetail | null {
  const api = data?.character;
  if (!api) return null;
  return {
    ...toCharacter(api),
    type: api.type ?? '',
    origin: { name: api.origin?.name ?? 'Unknown' },
    location: { name: api.location?.name ?? 'Unknown' },
  };
}
