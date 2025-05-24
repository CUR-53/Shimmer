import FilterValue from './FilterValue';

export default interface Filter {
  active_values: FilterValue[];
  false_value: FilterValue;
  inactive_values: FilterValue[];
  label: string;
  max_value: FilterValue;
  min_value: FilterValue;
  operator: string;
  param_name: string;
  presentation: 'image' | 'swatch' | 'text';
  range_max: number;
  true_value: FilterValue;
  type: 'boolean' | 'list' | 'price_range';
  url_to_remove: string;
  values: FilterValue[];
}
