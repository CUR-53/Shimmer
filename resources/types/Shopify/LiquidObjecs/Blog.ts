import Article from './Article';
import Metafield from './Metafield';

export default interface Blog {
  all_tags: string[];
  articles: Article[];
  articles_count: number;
  comments_enabled?: boolean;
  handle: string;
  id: number;
  metafields: Metafield[];
  moderated?: boolean;
  next_article: Article;
  previous_article: Article;
  tags: string[];
  template_suffix: string;
  title: string;
  url: string;
}
