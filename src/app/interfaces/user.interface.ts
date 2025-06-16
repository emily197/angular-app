export interface User {
  id?: string;
  name: string;
  email?: string;
  password: string;
  role: string;
  active?: boolean;
  area_id?: number;
  first_name?: string;
  second_last_name?: string;
  full_name?: string;
}
