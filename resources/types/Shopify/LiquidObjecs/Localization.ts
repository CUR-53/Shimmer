import Country from './Country';
import ShopLocale from './ShopLocale';

export default interface Localization {
  available_countries: Country[];
  available_languages: ShopLocale[];
  country: Country;
  language: ShopLocale;
}
