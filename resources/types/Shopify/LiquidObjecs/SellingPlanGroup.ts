import SellingPlan from './SellingPlan';
import SellingPlanGroupOption from './SellingPlanGroupOption';

export default interface SellingPlanGroup {
  app_id: string;
  id: number;
  name: string;
  options: SellingPlanGroupOption[];
  selling_plan_selected: boolean;
  selling_plans: SellingPlan[];
}
