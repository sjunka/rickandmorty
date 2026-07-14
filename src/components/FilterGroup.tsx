import { Text, View } from 'react-native';
import { FilterOption } from '@/components/FilterOption';
import type { FilterGroupProps } from '@/interfaces/components';
import { formatFilterLabel } from '@/utils/filters';

export const FilterGroup = <T extends string>({
  label,
  options,
  selected,
  onSelect,
}: FilterGroupProps<T>) => (
  <View className="mb-6">
    <Text className="mb-3 text-base text-gray-500">{label}</Text>
    <View className="flex-row flex-wrap gap-3">
      {options.map((option) => (
        <FilterOption
          key={option}
          option={option}
          isSelected={option === selected}
          label={formatFilterLabel(option)}
          groupLabel={label}
          onSelect={onSelect}
        />
      ))}
    </View>
  </View>
);
