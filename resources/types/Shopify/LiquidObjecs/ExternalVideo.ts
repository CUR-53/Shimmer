import image from './image';

export default interface ExternalVideo {
  alt: string;
  aspect_ratio: number;
  external_id: string;
  host: 'youtube' | 'vimeo'; // Only YouTube and Vimeo are supported.
  id: number;
  media_type: string;
  position: number;
  preview_image: image;
}
