import Rule from './Rule';
import Sitemap from './Sitemap';
import UserAgent from './UserAgent';

export default interface Group {
  rules: Rule[];
  sitemap: Sitemap;
  user_agent: UserAgent;
}
