import ImagePresentation from './ImagePresentation';
import PreviewImage from './PreviewImage';
import Variant from './Variant';

// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface image {
  alt: string | null;
  aspect_ratio: number;
  attached_to_variant: boolean;
  height: number;
  id: number;
  media_type: string;
  position: number;
  presentation: ImagePresentation;
  preview_image: PreviewImage;
  product_id: number;
  src: string;
  variants: Variant[];
  width: number;
}
