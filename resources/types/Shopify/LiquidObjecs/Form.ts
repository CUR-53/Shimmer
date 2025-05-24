import FormErrors from './FormErrors';

export default interface Form {
  address1: string;
  address2: string;
  author: string;
  body: string;
  city: string;
  company: string;
  country: string;
  email: string;
  errors: FormErrors[];
  first_name: string;
  id: string;
  last_name: string;
  message: string;
  name: string;
  password_needed: boolean;
  phone: string;
  posted_successfully: boolean;
  province: string;
  set_as_default_checkbox: boolean;
  zip: string;
}
