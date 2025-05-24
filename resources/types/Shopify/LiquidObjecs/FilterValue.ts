import image from './image';
import Swatch from './Swatch';

export default interface FilterValue {
  active: boolean;
  count: number;
  image: image;
  label: string;
  param_name: string;
  swatch: Swatch;
  url_to_add: string;
  url_to_remove: string;
  value: string;
}
