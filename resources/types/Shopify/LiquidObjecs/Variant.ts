import FeaturedImage from './FeaturedImage';
import FeaturedMedia from './FeaturedMedia';

export default interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  compare_at_price: string;
  available: boolean;
  fullfilment_service: string;
  inventory_management: string;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  created_at: string;
  updated_at: string;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id: number | null;
  weight: number;
  weight_unit: string;
  requires_shipping: boolean;
  quantity_rule: {
    min: number;
    max: number;
    increment: number;
  };
  price_currency: string;
  compare_at_price_currency: string;
  quantity_price_breaks: [];
}
