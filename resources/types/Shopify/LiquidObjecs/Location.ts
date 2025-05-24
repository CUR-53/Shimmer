import Address from './Address';
import Metafield from './Metafield';

export default interface Location {
  address: Address;
  id: number;
  latitude: number;
  longitude: number;
  metafields: Metafield[];
  name: string;
}
