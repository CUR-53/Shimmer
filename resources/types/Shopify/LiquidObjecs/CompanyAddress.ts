import Country from './Country';

export default interface CompanyAddress {
  address1: string;
  address2: string;
  attention: string;
  city: string;
  country: Country;
  country_code: string;
  first_name: string;
  id: number;
  last_name: string;
  province: string;
  province_code: string;
  street: string;
  zip: string;
}
