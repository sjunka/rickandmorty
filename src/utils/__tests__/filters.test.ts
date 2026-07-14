import {
  applyLocalFilters,
  countActiveFilters,
  EMPTY_FILTERS,
  toApiFilter,
} from '@/utils/filters';
import type { Character } from '@/types/character';

const character = (id: string, name: string): Character => ({
  id,
  name,
  image: '',
  species: 'Human',
  status: 'Alive',
  gender: 'Male',
});

const characters = [character('1', 'Rick'), character('2', 'Morty'), character('3', 'Summer')];

describe('toApiFilter', () => {
  it('is empty when nothing is set', () => {
    expect(toApiFilter(EMPTY_FILTERS, '')).toEqual({});
  });

  it('includes the trimmed search term and the selected filters', () => {
    const filter = toApiFilter(
      { ...EMPTY_FILTERS, species: 'Alien', status: 'Dead' },
      '  rick  '
    );
    expect(filter).toEqual({ name: 'rick', species: 'Alien', status: 'Dead' });
  });

  it('leaves out the kind filter, which is applied on the client', () => {
    expect(toApiFilter({ ...EMPTY_FILTERS, kind: 'starred' }, '')).toEqual({});
  });
});

describe('countActiveFilters', () => {
  it('counts only filters set to something other than all', () => {
    expect(countActiveFilters(EMPTY_FILTERS)).toBe(0);
    expect(countActiveFilters({ ...EMPTY_FILTERS, species: 'Human', gender: 'Female' })).toBe(2);
  });
});

describe('applyLocalFilters', () => {
  it('hides soft deleted characters', () => {
    const visible = applyLocalFilters(characters, {
      favoriteIds: [],
      deletedIds: ['2'],
      kind: 'all',
    });
    expect(visible.map((item) => item.id)).toEqual(['1', '3']);
  });

  it('keeps only favorites when kind is starred', () => {
    const visible = applyLocalFilters(characters, {
      favoriteIds: ['3'],
      deletedIds: [],
      kind: 'starred',
    });
    expect(visible.map((item) => item.id)).toEqual(['3']);
  });

  it('keeps only non favorites when kind is others', () => {
    const visible = applyLocalFilters(characters, {
      favoriteIds: ['3'],
      deletedIds: [],
      kind: 'others',
    });
    expect(visible.map((item) => item.id)).toEqual(['1', '2']);
  });

  it('excludes a deleted character even when it is a favorite', () => {
    const visible = applyLocalFilters(characters, {
      favoriteIds: ['1'],
      deletedIds: ['1'],
      kind: 'starred',
    });
    expect(visible).toEqual([]);
  });
});
