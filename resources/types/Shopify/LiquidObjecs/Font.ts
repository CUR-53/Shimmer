export default interface Font {
  baseline_ratio: number;
  fallback_families: string;
  family: string;
  style: string;
  system?: boolean;
  variants: Font[];
  weight: number;
}
