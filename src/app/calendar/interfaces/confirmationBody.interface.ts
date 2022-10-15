import { Customer } from './isc-appointment.interface';
export interface ConfirmationBody {
  notes:      string;
  customers:  Customer[];
}
