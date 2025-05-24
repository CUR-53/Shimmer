import PreviewImage from './PreviewImage';
import VideoSource from './VideoSource';

export default interface Video {
  alt: string;
  aspect_ratio: number;
  duration: number;
  id: number;
  media_type: 'video';
  position: number;
  preview_image: PreviewImage;
  sources: VideoSource[];
}
