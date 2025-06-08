export interface TableAction {
  icon: string;
  tooltip?: string;
  callback?: (row: any) => void;
  routerLink?: (row: any) => string | any[];
  disabled?: (row: any) => boolean;
}
