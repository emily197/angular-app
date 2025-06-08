import { Component } from '@angular/core';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent {

  listTitle: string = 'Empleado';
  listSubTitle: string = 'Listado';

  columns: TableColumn[] = [
    { label: 'User', field: 'genero' },
    { label: 'Nombre', field: 'name' },
    { label: 'H.Entrada', field: 'start_job' },
    { label: 'H.Salida', field: 'end_job' },
    { label: 'MAC', field: 'ip_address' },
  ];

  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-pen-to-square',
      tooltip: 'Editar MAC',
      routerLink: (row: any) => ['', row.id]
    }
  ];
}
