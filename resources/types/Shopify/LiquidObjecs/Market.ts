import Metafield from './Metafield';

export default interface Market {
  handle: string;
  id: string;
  metafields: Metafield[];
}
