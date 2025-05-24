export default interface Measurement {
  type: 'dimenstion' | 'volume' | 'weight';
  unit: string;
  value: number;
}
