import Article from './Article';
import Filter from './Filter';
import Page from './Page';
import Product from './Product';
import SortOption from './SortOption';

export default interface Search {
  default_sort_by: string;
  filters: Filter[];
  performed: boolean;
  results: Article[] | Page[] | Product[];
  results_count: number;
  sort_by: string;
  sort_options: SortOption[];
  terms: string;
  types: 'article' | 'page' | 'product'[];
}
