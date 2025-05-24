export default interface Product {
  id: number;
  title: string;
  handle: string;
  description: string;
  published_at: string;
  created_at: string;
  vendor: string;
  type: string;
  tags: string[];
  price: number;
  price_min: number;
  price_max: number;
  available: boolean;
  price_varies: boolean;
  compare_at_price: number | null;
  compare_at_price_min: number;
  compare_at_price_max: number;
  compare_at_price_varies: boolean;
  variants: Variant[];
  images: string[];
  featured_image: string;
  options: ProductOption[];
  url: string;
  media: Media[];
  requires_selling_plan: boolean;
  selling_plan_groups: any[];
}

interface Variant {
  id: number;
  title: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: string | null;
  available: boolean;
  name: string;
  public_title: string;
  options: string[];
  price: number;
  weight: number;
  compare_at_price: number | null;
  inventory_management: string | null;
  barcode: string;
  quantity_rule: QuantityRule;
  quantity_price_breaks: any[];
  requires_selling_plan: boolean;
  selling_plan_allocations: any[];
}

interface QuantityRule {
  min: number;
  max: number | null;
  increment: number;
}

interface ProductOption {
  name: string;
  position: number;
  values: string[];
}

interface Media {
  alt: string | null;
  id: number;
  position: number;
  preview_image: PreviewImage;
  aspect_ratio: number;
  height: number;
  media_type: string;
  src: string;
  width: number;
}

interface PreviewImage {
  aspect_ratio: number;
  height: number;
  width: number;
  src: string;
}
