import Currency from './Currency';
import Market from './Market';
import ShopLocale from './ShopLocale';

export default interface Country {
  available_languages: ShopLocale[];
  continent: string;
  currency: Currency;
  iso_code: string;
  market: Market;
  name: string;
  popular?: boolean;
  unit_system: 'imperial' | 'metric';
}
