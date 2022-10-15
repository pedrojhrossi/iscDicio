import { Meta, Customer } from './isc-appointment.interface';

export interface CustomerList {
  meta:          Meta;
  customerList:  Customer[];
  notifications: any[];
}
