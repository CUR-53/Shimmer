import Block from './Block';

export default interface Section {
  blocks: Block[];
  id: string;
  index: number;
  index0: number;
  location: string;
  settings: any;
}
