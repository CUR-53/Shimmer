import DiscountAllocation from './DiscountAllocation';
import TaxLine from './TaxLine';

export default interface ShippingMethod {
  discount_allocations: DiscountAllocation[];
  handle: string;
  id: string;
  original_price: number;
  price: number;
  tax_lines: TaxLine[];
  title: string;
}
