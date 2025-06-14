export type ColumnType = 'text' | 'currency' | 'image' | 'percent' | 'decorado' | 'color';
export interface TableColumn {
  label: string;
  field: string;
  type?: ColumnType;
}
