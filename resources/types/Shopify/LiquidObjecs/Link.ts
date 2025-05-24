export default interface Link {
  active: boolean;
  child_active: boolean;
  child_current: boolean;
  current: boolean;
  handle: string;
  levels: number;
  links: Link[];
  object: any;
  title: string;
  type: 'artice_link' | 'blog_link' | 'catalog_link' | 'collection_link' | 'collections_link' | 'frontpage_link' | 'http_link' | 'metaobject_link' | 'page_link' | 'polcy_link' | 'product_link' | 'search_link';
  url: string;
}
