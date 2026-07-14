import { View } from 'react-native';
import { DetailField } from '@/components/detail/DetailField';
import type { CharacterFieldsProps } from '@/interfaces/components';

export const CharacterFields = ({ character }: CharacterFieldsProps) => (
  <View className="mt-4">
    <DetailField label="Specie" value={character.species} />
    <DetailField label="Status" value={character.status} />
    <DetailField label="Gender" value={character.gender} />
    <DetailField label="Origin" value={character.origin.name} />
    <DetailField label="Location" value={character.location.name} />
  </View>
);
