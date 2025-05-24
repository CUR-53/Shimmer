export default interface VideoSource {
  format: 'mov' | 'mp4' | 'm3u8';
  height: number;
  mime_type: string;
  url: string;
  width: number;
}
