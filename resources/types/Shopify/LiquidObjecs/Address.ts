import Country from './Country';

export default interface Address {
  address1: string;
  address2: string;
  city: string;
  company: string;
  country: Country;
  country_code: string;
  first_name: string;
  id: number;
  last_name: string;
  name: string;
  phone: string;
  province: string;
  province_code: string;
  street: string;
  summary: string;
  url: string;
  zip: string;
}
