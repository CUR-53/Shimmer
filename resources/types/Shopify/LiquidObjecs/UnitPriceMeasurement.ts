export default interface UnitPriceMeasurement {
  measured_type: 'volume' | 'weight' | 'dimensions';
  quantity_unit: string;
  quantity_value: number;
  reference_unit: string;
  reference_value: number;
}
