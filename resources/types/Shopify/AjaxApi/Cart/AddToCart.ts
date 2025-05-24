export interface AddToCartResponse {
  items: {
    id: number;
    title: string;
    key: string;
    price: number;
    line_price: number;
    quantity: number;
    sku: string | null;
    grams: number;
    vendor: string;
    properties: Record<string, any> | null;
    variant_id: number;
    gift_card: boolean;
    url: string;
    featured_image: {
      url: string;
      aspect_ratio: number;
      alt: string;
    };
    image: string;
    handle: string;
    requires_shipping: boolean;
    product_title: string;
    product_description: string;
    product_type: string;
    variant_title: string;
    variant_options: string[];
    options_with_values: {
      name: string;
      value: string;
    }[];
  }[];
}

export interface AddToCartRequest {
  id: string;
  quantity: number;
}
