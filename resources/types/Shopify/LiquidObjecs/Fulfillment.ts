import LineItem from './LineItem';

export default interface Fulfillment {
  created_at: string;
  fullfillment_line_items: LineItem[];
  item_count: number;
  tracking_company: string;
  tracking_number: string;
  tracking_numbers: string[];
  tracking_url: string;
}
