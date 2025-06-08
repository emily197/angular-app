import { Component } from '@angular/core';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';

@Component({
  selector: 'app-index',
  imports: [],
  templateUrl: './index.component.html',
})
export class IndexComponent {

  listTitle: string = 'Overtime dayli';
  listSubTitle: string = 'List of daily overtime hours';

  columns: TableColumn[] = [
    { label: 'User', field: 'genero' },
    { label: 'Nombre', field: 'name' },
    { label: 'H. Entrada', field: 'start_job' },
    { label: 'H. Salida', field: 'end_job' },
  ];

  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-pen-to-square',
      tooltip: 'Asignar tiempo',
      routerLink: (row: any) => ['', row.id]
    }
  ];


}
