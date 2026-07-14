import { sortCharactersByName } from '@/utils/sortCharacters';
import type { Character } from '@/interfaces/character';

const character = (id: string, name: string): Character => ({
  id,
  name,
  image: '',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
});

const characters = [
  character('1', 'Morty Smith'),
  character('2', 'Beth Smith'),
  character('3', 'rick sanchez'),
];

describe('sortCharactersByName', () => {
  it('sorts names A-Z', () => {
    const sorted = sortCharactersByName(characters, 'asc');
    expect(sorted.map((item) => item.name)).toEqual([
      'Beth Smith',
      'Morty Smith',
      'rick sanchez',
    ]);
  });

  it('sorts names Z-A', () => {
    const sorted = sortCharactersByName(characters, 'desc');
    expect(sorted.map((item) => item.name)).toEqual([
      'rick sanchez',
      'Morty Smith',
      'Beth Smith',
    ]);
  });

  it('does not mutate the original array', () => {
    const original = [...characters];
    sortCharactersByName(characters, 'asc');
    expect(characters).toEqual(original);
  });
});
