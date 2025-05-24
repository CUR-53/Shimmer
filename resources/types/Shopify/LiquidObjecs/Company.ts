import type CompanyLocation from './CompanyLocation';
import Metafield from './Metafield';

export default interface Company {
  available_locations: CompanyLocation[];
  available_locations_count: number;
  id: number;
  metafields: Metafield[];
  name: string;
}
