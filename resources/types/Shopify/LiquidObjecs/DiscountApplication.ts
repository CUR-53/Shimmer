export default interface DiscountApplication {
  target_selection: 'all' | 'entitled' | 'explicit';
  target_type: 'line_item' | 'shipping_line';
  title: string;
  total_allocated_amount: number;
  type: 'automatic' | 'discount_code' | 'manual' | 'script';
  value: number;
  value_type: 'fixed_amount' | 'percentage';
}
