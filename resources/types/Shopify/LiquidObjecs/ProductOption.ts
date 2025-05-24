import ProductOptionValue from './ProductOptionValue';

export default interface ProductOption {
  name: string;
  position: number;
  selected_value: string;
  values: ProductOptionValue[];
}
