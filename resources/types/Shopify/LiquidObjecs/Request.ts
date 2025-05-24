import ShopLocale from './ShopLocale';

export default interface Request {
  design_mode: boolean;
  host: string;
  locale: ShopLocale;
  origin: string;
  page_type:
    | '404'
    | 'article'
    | 'blog'
    | 'captcha'
    | 'cart'
    | 'collection'
    | 'list-collections'
    | 'customers/account'
    | 'customers/activate_account'
    | 'customers/addresses'
    | 'customers/login'
    | 'customers/order'
    | 'customers/register'
    | 'customers/reset_password'
    | 'gift_card'
    | 'index'
    | 'metaobject'
    | 'page'
    | 'password'
    | 'policy'
    | 'product'
    | 'searcg';
  path: string;
  visual_preview_mode: boolean;
}
