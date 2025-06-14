import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';
import { SideModalComponent } from 'src/app/shared/components/side-modal/side-modal.component';
import { TableGenericComponent } from 'src/app/shared/components/table-generic/table-generic.component';
import { FormUtils } from 'src/app/utils/form-utils';
import { OvertimeService } from '../../../services/overtime.service';
import { Employee } from 'src/app/interfaces/employee.interface';

@Component({
  selector: 'app-overtime-month',
  imports: [TableGenericComponent, SideModalComponent],
  templateUrl: './overtime-month.component.html',
})
export class OvertimeMonthComponent implements OnInit {
  listTitle: string = 'Overtime month';
  listSubTitle: string = 'Listado';
  titleModal: string = 'Detalle';
  formUtils = FormUtils;

  columns: TableColumn[] = [
    { label: 'User', field:'genero', type: 'image'},
    { label: 'Nombre', field: 'name' },
    { label: 'Tiempo mes', field: 'sum_time' },
  ];

  actions: TableAction[] = [
  {
      icon: 'fa-regular fa-eye',
      tooltip: 'Detalle',
      callback: this.openSideModal.bind(this)
    }
  ];

  showSideModal: boolean = false;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}
  private overtimeService = inject(OvertimeService);
  employees: Employee[] = [];
  employee: any;
  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  date = new Date();
  month: number = this.date.getMonth() + 1;

  load(mes: number) {
    this.overtimeService.getOvertimesMonth(mes)
      .subscribe(data =>  {
        this.employees = data.overtimes;
      });
  }

  showDetail(id:number, month: number) {

    this.overtimeService.showOvertimeDetail(id, month).subscribe(data => {
      this.employee = data.employee;
      console.log(data.employee);
    });
  }

  openSideModal(id: number) {
    this.showSideModal = true;
    this.showDetail(id, this.month);
  }

  closeSideModal() {
    this.showSideModal = false;
  }

  onMonthChange(event: Event):void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.month = parseInt(selectedValue, 10);
    console.log('Mes seleccionado:', this.month);
    this.load(this.month);
  }

  save() {}


  ngOnInit(): void {
    this.load(this.month);
    this.employee = {
      'id': 0,
      'name': '',
      'genero': 0,
      'details': []
    }
  }

}
