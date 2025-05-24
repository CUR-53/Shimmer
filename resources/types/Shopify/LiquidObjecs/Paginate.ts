import Part from './Part';

export default interface Paginate {
  current_offset: number;
  current_page: number;
  items: number;
  next: Part;
  page_param: string;
  page_size: number;
  pages: number;
  parts: Part[];
  previous: Part;
}
