export interface Employee {
  id?: string;
  name: string;
  status: boolean;
  area_id: string;
  nro_document: string;
  start_job: string;
  end_job: string;
  hours: string;
  ip_address: string;
  genero: string;
  areas?: [];

  start_hour?: string;
  end_hour?: string;
  new_end?: string;
  new_start?: string;
  extra_time?: [];
  logouts?: [];
  semaforo?: number;
  new_time?: string;
}
