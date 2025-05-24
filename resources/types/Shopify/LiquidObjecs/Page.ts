import Metafield from './Metafield';

export default interface Page {
  author: string;
  content: string;
  handle: string;
  id: number;
  metafields: Metafield[];
  published_at: string;
  template_suffix: string;
  title: string;
  url: string;
}
