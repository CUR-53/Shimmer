import Comment from './Comment';
import image from './image';
import Metafield from './Metafield';
import User from './User';

export default interface Article {
  author: string;
  comment_post_url: string;
  comments: Comment[];
  comments_count: number;
  comments_enabled?: boolean;
  content: string;
  created_at: string;
  excerpt: string;
  excerpt_or_content: string;
  handle: string;
  id: string;
  image: image;
  metafields: Metafield[];
  moderated?: boolean;
  published_at: string;
  tags: string[];
  template_suffix: string;
  title: string;
  updated_at: string;
  url: string;
  user: User;
}
