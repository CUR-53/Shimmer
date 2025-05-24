import Product from './Product';

export default interface Recommendations {
  intent: string;
  performed?: boolean;
  products: Product[];
  products_count: number;
}
