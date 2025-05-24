import Filter from './Filter';
import image from './image';
import Metafield from './Metafield';
import type Product from './Product';
import SortOption from './SortOption';

export default interface Collection {
  all_products_count: number;
  all_tags: string[];
  all_types: string[];
  all_vendors: string[];
  content_type: string;
  current_vendor: string;
  default_sort_by: string;
  featured_image: image;
  filters: Filter[];
  handle: string;
  id: number;
  image: image;
  metafields: Metafield[];
  next_product: Product;
  previous_product: Product;
  products: Product[];
  products_count: number;
  published_at: string;
  sort_by: string;
  sort_options: SortOption[];
  tags: string[];
  template_suffix: string;
  title: string;
  url: string;
}
