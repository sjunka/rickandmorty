import { useCallback, useEffect, useState } from 'react';
import { Modal, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterButton } from '@/components/filters/FilterButton';
import { FilterGroup } from '@/components/filters/FilterGroup';
import { FilterHeader } from '@/components/filters/FilterHeader';
import type { FilterModalProps } from '@/interfaces/components';
import type { Filters } from '@/interfaces/character';
import type { CharacterKind, GenderFilter, SpeciesFilter, StatusFilter } from '@/types/filters';
import { countActiveFilters } from '@/utils/filters';

const KIND_OPTIONS: readonly CharacterKind[] = ['all', 'starred', 'others'];
const SPECIES_OPTIONS: readonly SpeciesFilter[] = ['all', 'Human', 'Alien'];
const STATUS_OPTIONS: readonly StatusFilter[] = ['all', 'Alive', 'Dead', 'unknown'];
const GENDER_OPTIONS: readonly GenderFilter[] = ['all', 'Male', 'Female', 'Genderless'];

export const FilterModal = ({ visible, filters, onClose, onApply }: FilterModalProps) => {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<Filters>(filters);

  // The modal keeps its own draft so closing without applying discards changes.
  useEffect(() => {
    if (visible) setDraft(filters);
  }, [visible, filters]);

  const selectKind = useCallback(
    (kind: CharacterKind) => setDraft((current) => ({ ...current, kind })),
    []
  );
  const selectSpecies = useCallback(
    (species: SpeciesFilter) => setDraft((current) => ({ ...current, species })),
    []
  );
  const selectStatus = useCallback(
    (status: StatusFilter) => setDraft((current) => ({ ...current, status })),
    []
  );
  const selectGender = useCallback(
    (gender: GenderFilter) => setDraft((current) => ({ ...current, gender })),
    []
  );

  const applyDraft = useCallback(() => onApply(draft), [onApply, draft]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      {/* A Modal renders in its own native hierarchy, so the safe area has to
          come from the insets rather than a SafeAreaView. */}
      <View
        className="flex-1 bg-white dark:bg-gray-900"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <FilterHeader onClose={onClose} />

        <ScrollView contentContainerClassName="px-4 pt-4">
          <FilterGroup
            label="Characters"
            options={KIND_OPTIONS}
            selected={draft.kind}
            onSelect={selectKind}
          />
          <FilterGroup
            label="Specie"
            options={SPECIES_OPTIONS}
            selected={draft.species}
            onSelect={selectSpecies}
          />
          <FilterGroup
            label="Status"
            options={STATUS_OPTIONS}
            selected={draft.status}
            onSelect={selectStatus}
          />
          <FilterGroup
            label="Gender"
            options={GENDER_OPTIONS}
            selected={draft.gender}
            onSelect={selectGender}
          />
        </ScrollView>

        <View className="px-4 pb-2 pt-2">
          <FilterButton enabled={countActiveFilters(draft) > 0} onPress={applyDraft} />
        </View>
      </View>
    </Modal>
  );
};
