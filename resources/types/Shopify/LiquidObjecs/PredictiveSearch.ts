import PredictiveSearchResources from './PredictiveSearchResources';

export default interface PredictiveSearch {
  performed: boolean;
  resources: PredictiveSearchResources[];
  terms: string;
  types: 'article' | 'collection' | 'page' | 'product'[];
}
