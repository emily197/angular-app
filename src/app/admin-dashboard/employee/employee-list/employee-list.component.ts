import { Component, inject, OnInit } from '@angular/core';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';
import { TableGenericComponent } from "../../../shared/components/table-generic/table-generic.component";
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/interfaces/employee.interface';
import { SideModalComponent } from 'src/app/shared/components/side-modal/side-modal.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from 'src/app/utils/form-utils';

@Component({
  selector: 'app-employee-list',
  imports: [TableGenericComponent, SideModalComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  listTitle: string = 'Empleado';
  listSubTitle: string = 'Listado';
  titleModal: string = "Editar MAC address";
  formUtils = FormUtils;
  searchText: string = '';

  columns: TableColumn[] = [
    { label: 'User', field: 'genero', type: 'image' },
    { label: 'Nombre', field: 'name' },
    { label: 'H.Entrada', field: 'start_job' },
    { label: 'H.Salida', field: 'end_job' },
    { label: 'MAC', field: 'ip_address' },
  ];

  actions: TableAction[] = [
    {
      icon: 'fa-solid fa-pen-to-square',
      tooltip: 'Editar MAC',
      callback: this.openSideModal.bind(this)
    }
  ];
  showSideModal: boolean = false;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {}

  private employeeService = inject(EmployeeService);
  employees: Employee[] = [];
  employee: any;

  loadEmployees(filter: string = '') {
    this.employeeService.getEmployees(filter).subscribe(data => {
      console.log('data =>', data.employees);
      this.employees = data.employees;
    });
  }

  onSearch() {
    this.loadEmployees(this.searchText.trim());
  }

  create(id: number) {
    this.employeeService.showEmployee(id).subscribe(data => {
      this.employee = data.employee;
      this.formGroup.patchValue({
        id: this.employee.id,
        name: this.employee.name,
        area: this.employee.areas.name,
        ip_address: this.employee.ip_address
      })
    })
  }

  save() {
    if (this.formGroup.valid) {
      const { id, ip_address } = this.formGroup.value;
      this.employeeService.update(id, ip_address).subscribe({
        next: (res) => {
          alert(res.message || 'Actualizado con éxito');
          this.closeSideModal();
          this.loadEmployees();
        },
        error: (err) => {
          alert('Error al actualizar');
        }
      });
    }
  }

  openSideModal(id: number) {
    this.showSideModal = true;
    console.log('ID del empleado:', id);
    this.create(id);
  }

  closeSideModal() {
    this.showSideModal = false;
  }

  ngOnInit(): void {
    this.loadEmployees();
    this.formGroup = this.fb.group({
      id: [0],
      name: [''],
      area: [''],
      ip_address: ['', Validators.required],
    });
  }

}
