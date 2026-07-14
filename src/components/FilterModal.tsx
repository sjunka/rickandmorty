import { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FilterGroup } from '@/components/FilterGroup';
import type { FilterModalProps } from '@/interfaces/components';
import type { Filters } from '@/interfaces/character';
import type {
  CharacterKind,
  GenderFilter,
  SpeciesFilter,
  StatusFilter,
} from '@/types/filters';

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
        className="flex-1 bg-white"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <View className="flex-row items-center px-4 py-3">
          <Pressable
            onPress={onClose}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Close filters"
          >
            <Ionicons name="arrow-back" size={24} color="#7A56C0" />
          </Pressable>
          <Text className="flex-1 text-center text-base font-semibold text-gray-900">Filters</Text>
          <View className="w-6" />
        </View>

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
          <Pressable
            onPress={applyDraft}
            accessibilityRole="button"
            accessibilityLabel="Apply filters"
            className="rounded-lg bg-primary-600 py-4 active:bg-primary-700"
          >
            <Text className="text-center text-base font-semibold text-white">Filter</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
