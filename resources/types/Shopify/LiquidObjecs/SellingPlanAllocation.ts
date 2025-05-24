import SellingPlan from './SellingPlan';
import SellingPlanAllocationPriceAdjustment from './SellingPlanAllocationPriceAdjustment';

export default interface SellingPlanAllocation {
  checkout_charge_amount: number;
  compare_at_price: number;
  per_delivery_price: number;
  price: number;
  price_adjustments: SellingPlanAllocationPriceAdjustment[];
  remaining_balance_charge_amount: number;
  selling_plan: SellingPlan;
  selling_plan_group_id: string;
  unit_price: number;
}
