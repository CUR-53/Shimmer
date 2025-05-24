import Customer from './Customer';
import Product from './Product';
import Recipient from './Recipient';

export default interface GiftCard {
  balance: number;
  code: string;
  currency: string;
  customer: Customer;
  enabled: boolean;
  expired: boolean;
  expires_on: string;
  initial_value: number;
  last_four_characters: string;
  message: string;
  pass_url: string;
  product: Product;
  properties: { name: string; value: string }[];
  qr_identifier: string;
  recipient: Recipient;
  send_on: string;
  teplate_suffix: string;
  url: string;
}
