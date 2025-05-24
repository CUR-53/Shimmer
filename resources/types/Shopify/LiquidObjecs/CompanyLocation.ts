import Company from './Company';
import CompanyAddress from './CompanyAddress';
import Metafield from './Metafield';

export default interface CompanyLocation {
  company: Company;
  current?: boolean;
  id: number;
  metafields: Metafield[];
  name: string;
  shipping_address: CompanyAddress;
  tax_registration_id: number;
  url_to_set_as_current: string;
}
