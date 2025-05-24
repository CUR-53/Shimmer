import Address from './Address';
import Company from './Company';
import CompanyLocation from './CompanyLocation';
import type Order from './Order';

export default interface Customer {
  accepts_marketing: boolean;
  addresses: Address[];
  addresses_count: number;
  b2b?: boolean;
  company_available_locations: CompanyLocation[];
  company_available_locations_count: number;
  currenct_company: Company;
  current_location: CompanyLocation;
  default_address: Address;
  email: string;
  first_name: string;
  has_account: boolean;
  has_avatar?: boolean;
  id: number;
  last_name: string;
  last_order: Order;
  name: string;
  orders: Order[];
  orders_count: number;
  phone: string;
  tags: string[];
  tax_exempt: boolean;
  total_spent: number;
}
