import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Filters } from '@/types/character';

interface FilterModalProps {
  visible: boolean;
  filters: Filters;
  onClose: () => void;
  onApply: (filters: Filters) => void;
}

interface FilterGroupProps<T extends string> {
  label: string;
  options: readonly T[];
  selected: T;
  onSelect: (option: T) => void;
}

const CAPITALIZED: Record<string, string> = { all: 'All', unknown: 'Unknown' };

const FilterGroup = <T extends string>({
  label,
  options,
  selected,
  onSelect,
}: FilterGroupProps<T>) => (
  <View className="mb-6">
    <Text className="mb-3 text-base text-gray-500">{label}</Text>
    <View className="flex-row flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${label}: ${CAPITALIZED[option] ?? option}`}
            className={`flex-1 rounded-lg border py-3 ${
              isSelected ? 'border-primary-100 bg-primary-100' : 'border-gray-200 bg-white'
            }`}
          >
            <Text
              className={`text-center text-sm ${
                isSelected ? 'font-semibold text-primary-700' : 'text-gray-700'
              }`}
            >
              {CAPITALIZED[option] ?? option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </View>
);

export const FilterModal = ({ visible, filters, onClose, onApply }: FilterModalProps) => {
  const [draft, setDraft] = useState<Filters>(filters);

  // Reset the draft to the applied filters whenever the modal reopens.
  const [lastVisible, setLastVisible] = useState(visible);
  if (visible !== lastVisible) {
    setLastVisible(visible);
    if (visible) setDraft(filters);
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center px-4 py-2">
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

        <ScrollView className="flex-1 px-4 pt-4">
          <FilterGroup
            label="Characters"
            options={['all', 'starred', 'others'] as const}
            selected={draft.kind}
            onSelect={(kind) => setDraft({ ...draft, kind })}
          />
          <FilterGroup
            label="Specie"
            options={['all', 'Human', 'Alien'] as const}
            selected={draft.species}
            onSelect={(species) => setDraft({ ...draft, species })}
          />
          <FilterGroup
            label="Status"
            options={['all', 'Alive', 'Dead', 'unknown'] as const}
            selected={draft.status}
            onSelect={(status) => setDraft({ ...draft, status })}
          />
          <FilterGroup
            label="Gender"
            options={['all', 'Male', 'Female', 'Genderless'] as const}
            selected={draft.gender}
            onSelect={(gender) => setDraft({ ...draft, gender })}
          />
        </ScrollView>

        <View className="px-4 pb-4">
          <Pressable
            onPress={() => onApply(draft)}
            accessibilityRole="button"
            accessibilityLabel="Apply filters"
            className="rounded-lg bg-primary-600 py-4 active:bg-primary-700"
          >
            <Text className="text-center text-base font-semibold text-white">Filter</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
};
