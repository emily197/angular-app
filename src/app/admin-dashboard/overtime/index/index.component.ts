import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Employee } from 'src/app/interfaces/employee.interface';
import { Overtime } from 'src/app/interfaces/overtime.interface';
import { TableAction } from 'src/app/interfaces/tableAction.interface';
import { TableColumn } from 'src/app/interfaces/tableColumn.interface';
import { OvertimeService } from 'src/app/services/overtime.service';
import { SideModalComponent } from 'src/app/shared/components/side-modal/side-modal.component';
import { TableGenericComponent } from 'src/app/shared/components/table-generic/table-generic.component';
import { FormUtils } from 'src/app/utils/form-utils';
import { Subject, combineLatest } from 'rxjs';
import { debounceTime, takeUntil, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  imports: [TableGenericComponent, SideModalComponent, ReactiveFormsModule],
  templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit, OnDestroy {

  listTitle: string = 'Overtime dayli';
  listSubTitle: string = 'List of daily overtime hours';
  titleModal: string = '';
  formUtils = FormUtils;

  columns: TableColumn[] = [
    { label: 'User', field: 'genero', type: 'image' },
    { label: 'Nombre', field: "name" },
    { label: 'Estado', field: 'semaforo', type: 'color' },
    { label: 'H. Entrada', field: 'start_job' },
    { label: 'H. Salida', field: 'end_job' },
  ];

  actions: TableAction[] = [
    {
      icon: 'fa-regular fa-sun',
      tooltip: 'Asignar IN',
      callback: this.openSideModalIn.bind(this)
    },
    {
      icon: 'fa-regular fa-moon',
      tooltip: 'Asignar OUT',
      callback: this.openSideModalOut.bind(this)
    }
  ];

  showSideModalIn: boolean = false;
  showSideModalOut: boolean = false;
  formGroup!: FormGroup;
  private destroy$ = new Subject<void>();
  private modalSubscriptions$ = new Subject<void>();

  constructor(private fb: FormBuilder) {}
  private overtimeService = inject(OvertimeService);
  employees: Employee[] = [];
  employee: any;

  //romper el quantity de bd
  getHoursAndMinutes(quantity: string): { hours: number, minutes: number } {
    const [hoursStr, minutesStr] = quantity.split(':');
    return {
      hours: parseInt(hoursStr, 10),
      minutes: parseInt(minutesStr, 10)
    };
  }

  load() {
    this.overtimeService.getOvertimes().subscribe(data => {
      this.employees = data.employees;
    });
  }

  create(id: number, type: string) {

    this.overtimeService.showOvertime(id, type).subscribe(data => {
      this.employee = data.employee;
      console.log(data.employee);
      const { hours, minutes } = this.getHoursAndMinutes(this.employee.quantity);

      this.formGroup.patchValue({
        id: this.employee.id,
        name: this.employee.name,
        area: this.employee.areas.name,
        start_job: this.employee.start_job,
        end_job: this.employee.end_job,
        new_time: this.employee.new_time,
        ip_address: this.employee.ip_address,
        hour: hours,
        min: minutes,
        type: type
      });
      // Inicializar suscripciones del modal después de cargar los datos
      this.initializeModalSubscriptions();
    });
  }

  private initializeModalSubscriptions() {
    // Limpiar suscripciones anteriores del modal
    this.modalSubscriptions$.next();

    // Suscribirse a los cambios de hour y min usando startWith para emitir valores iniciales
    combineLatest([
      this.formGroup.get('hour')!.valueChanges.pipe(
        startWith(this.formGroup.get('hour')!.value)
      ),
      this.formGroup.get('min')!.valueChanges.pipe(
        startWith(this.formGroup.get('min')!.value)
      )
    ]).pipe(
      takeUntil(this.modalSubscriptions$),
      debounceTime(100)
    ).subscribe(() => {
      this.calculateNewTime();
    });

    // También suscribirse a cambios en start_job por si cambia
    this.formGroup.get('start_job')!.valueChanges
      .pipe(
        takeUntil(this.modalSubscriptions$),
        debounceTime(100)
      )
      .subscribe(() => {
        this.calculateNewTime();
      });

    // Calcular inicialmente
    this.calculateNewTime();
  }

  // * Eventos de modal
  openSideModalIn(id: number) {
    this.showSideModalIn = true;
    this.titleModal = 'Asignar hora entrada'
    this.create(id, 'IN');
  }

  openSideModalOut(id: number) {
    this.showSideModalOut = true;
    this.titleModal = 'Asignar hora salida'
    this.create(id, 'OUT');
  }

  closeSideModal() {
    // Limpiar suscripciones del modal ANTES de resetear el formulario
    console.log('limpio o no?');
    this.modalSubscriptions$.next();

    this.showSideModalIn = false;
    this.showSideModalOut = false;

    // Resetear el formulario de forma segura
    this.formGroup.reset({
      id: 0,
      name: '',
      area: '',
      start_job: '',
      end_job: '',
      new_time: '',
      hour: 0,
      min: 0,
      type: 0,
    });
    console.log(this.formGroup);
  }

  save() {
    if (this.formGroup.valid) {
      this.overtimeService.postOvertime(this.formGroup.value).subscribe({
        next: (resp) => {
          alert(resp.message || 'yeee');
          this.closeSideModal();
          this.load();
        },
        error: (err) => {
          console.log('Error en registrar', err);
        }
      });
      console.log(this.formGroup.value);
    }
  }

  private calculateNewTime() {

    //este es el problema hay que separar la logica en 2 partes pipipipi
    const type = this.formGroup.get('type')?.value; //ya tengo el type te amo hidden xd
    const startJob = this.formGroup.get('start_job')?.value;
    const endJob = this.formGroup.get('end_job')?.value;
    let extraHour = parseInt(this.formGroup.get('hour')?.value || '0');
    let extraMin = parseInt(this.formGroup.get('min')?.value || '0');
    console.log(extraMin);
    console.log(extraHour);
    let extraTotalMinutes: number;

    if( type == 'IN') {

      // Validar que startJob existe y no está vacío
      if (!startJob || startJob === '') return;

      try {

        // Convertir start_job a minutos desde medianoche
        const [startHour, startMinute] = startJob.split(':').map(Number);

        // Validar que los valores son números válidos
        if (isNaN(startHour) || isNaN(startMinute)) return;

        const startTotalMinutes = startHour * 60 + startMinute;

        // Calcular tiempo extra en minutos
        extraTotalMinutes = extraHour * 60 + extraMin;

        // Restar el tiempo extra del tiempo de entrada
        let newTotalMinutes = startTotalMinutes - extraTotalMinutes;

        // Manejar casos donde el resultado sea negativo (día anterior)
        if (newTotalMinutes < 0) {
          newTotalMinutes += 24 * 60; // Agregar 24 horas
        }

        // Convertir de vuelta a formato HH:MM
        const newHour = Math.floor(newTotalMinutes / 60);
        const newMinute = newTotalMinutes % 60;

        const newTimeString = `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;

        // Actualizar el campo new_time sin disparar eventos
        this.formGroup.get('new_time')?.setValue(newTimeString, { emitEvent: false });

      } catch (error) {
        console.error('Error calculando nueva hora:', error);
      }
    }
    else {

      if (!endJob || endJob === '') return;
      try {

        const [endHour, endMinute] = endJob.split(':').map(Number);
        if (isNaN(endHour) || isNaN(endMinute)) return;
        const endTotalMinutes = endHour * 60 + endMinute;
        extraTotalMinutes = extraHour * 60 + extraMin;
        let newTotalMinutes = endTotalMinutes + extraTotalMinutes;

        if ( newTotalMinutes < 0 ) {
          newTotalMinutes +=24*60;
        }

        const newHour = Math.floor(newTotalMinutes / 60);
        const newMinute = newTotalMinutes % 60;

        const newTimeString = `${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}`;
        this.formGroup.get('new_time')?.setValue(newTimeString, { emitEvent: false });


      } catch (error) {
        console.error('Error calculando nueva hora:', error);
      }

    }

  }

  ngOnInit(): void {
    this.load();

    this.formGroup = this.fb.group({
      id: [0],
      name: [''],
      area: [''],
      start_job: [''],
      end_job: [''],
      new_time: [''],
      hour: [0],
      min: [0],
      type: [1],
      ip_address: ['']
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.modalSubscriptions$.next();
    this.modalSubscriptions$.complete();
  }
}
