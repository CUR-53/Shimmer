import Article from './Article';
import Collection from './Collection';
import Page from './Page';
import Product from './Product';

export default interface PredictiveSearchResources {
  articles: Article[];
  collections: Collection[];
  pages: Page[];
  products: Product[];
}
