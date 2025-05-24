import PreviewImage from './PreviewImage';

export default interface Media {
  alt: string | null;
  id: number;
  media_type: string;
  position: number;
  preview_image: PreviewImage;
}
