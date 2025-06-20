import { CurrencyPipe, PercentPipe, UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';

/*export interface TableColumn {
  label: string;
  field: string;
  type?: 'text' | 'currency' | 'image' | 'percent'|'decorado' ;
}*/

/*
export interface TableAction {
  icon: string;                        // Clase de ícono (FontAwesome u svg aun lo sigo pensando .... piipipipi)
  tooltip?: string;
  callback?: (row: any) => void;
  routerLink?: (row: any) => string | any[];
}*/

@Component({
  selector: 'app-table-generic',
  imports: [CurrencyPipe, UpperCasePipe, PercentPipe, RouterLink],
  templateUrl: './table-generic.component.html',
})

export class TableGenericComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions?: TableAction[];

  getValue(row: any, field: string): any {
    return field.split('.').reduce((acc, part) => acc?.[part], row);
  }

}

