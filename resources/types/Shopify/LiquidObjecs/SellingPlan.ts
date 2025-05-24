import SellingPlanAllocationPriceAdjustment from './SellingPlanAllocationPriceAdjustment';
import SellingPlanCheckoutCharge from './SellingPlanCheckoutCharge';
import SellingPlanOption from './SellingPlanOption';

export default interface SellingPlan {
  checkout_charge: SellingPlanCheckoutCharge;
  description: string;
  group_id: string;
  id: number;
  name: string;
  options: SellingPlanOption[];
  price_adjustments: SellingPlanAllocationPriceAdjustment[];
  recurring_deliveries: boolean;
  selected: boolean;
}
