import Swatch from './Swatch';
import Variant from './Variant';

export default interface ProductOptionValue {
  available: boolean;
  id: number;
  name: string;
  product_url: string;
  selected: boolean;
  swatch: Swatch;
  variant: Variant;
}
