import ModelSource from './ModelSource';
import PreviewImage from './PreviewImage';

export default interface Model {
  alt: string;
  id: number;
  media_type: 'model';
  position: number;
  preview_image: PreviewImage;
  sources: ModelSource[];
}
