import { AppointmentList, Meta } from './isc-appointment.interface';

export interface ConfirmationCustomer {
  meta:            Meta;
  appointmentList: AppointmentList[];
  notifications:   any[];
}

export interface ConfirmationAppointment {
  meta:          Meta;
  appointment:   AppointmentList;
  notifications: any[];
}
