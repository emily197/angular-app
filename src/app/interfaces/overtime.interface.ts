import { Employee } from "./employee.interface";

export interface Overtime {
  id?: string;
  employee_id: string;
  employee: Employee;
  day_extra: string;
  quantity: string;
  boss_id: string;
  type: string;
  new_time: string;
}
