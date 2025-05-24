import PreviewImage from './PreviewImage';

export default interface GenericFile {
  alt: string;
  id: number;
  media_type: 'generic_file';
  position: number;
  preview_image: PreviewImage;
  url: string;
}
