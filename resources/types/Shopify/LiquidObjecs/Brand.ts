import image from './image';
import Metafield from './Metafield';

export default interface Brand {
  colors: any[];
  cover_image: image;
  favicon_url: image;
  logo: image;
  metafields: Metafield[];
  short_description: string;
  slogan: string;
  square_logo: image;
}
