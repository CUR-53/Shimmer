export default interface SellingPlanPriceAdjustment {
  order_count: number;
  position: number;
  value: number;
  value_type: 'percentage' | 'fixed_amount' | 'price';
}
