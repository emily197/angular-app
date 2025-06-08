import { Component } from '@angular/core';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
})
export class IndexComponent {

  listTitle: string = 'Horas extras acumuladas';
  listSubTitle: string = 'Listado de horas extras acumuladas';

  columns: TableColumn[] = [
    { label: 'User', field: 'genero' },
    { label: 'Colaborador', field: 'name' },
    { label: 'Mes', field: 'mes' },
    { label: 'H.Extra acumulado', field: 'sum_time' }
  ];

  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-pen-to-square',
      tooltip: 'Ver detalle',
      routerLink: (row: any) => ['', row.id]
    }
  ];
}
