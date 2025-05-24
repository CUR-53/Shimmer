export default interface Metafield {
  list?: boolean;
  type:
    | 'single_line_text_field'
    | 'multi_line_text_field'
    | 'rich_text_field'
    | 'product_reference'
    | 'collection_reference'
    | 'variant_reference'
    | 'page_reference'
    | 'file_reference'
    | 'number_integer'
    | 'number_decimal'
    | 'date'
    | 'date_time'
    | 'url_reference'
    | 'json'
    | 'boolean'
    | 'color'
    | 'weight'
    | 'volume'
    | 'dimension'
    | 'rating'
    | 'money';
  value: any;
}
