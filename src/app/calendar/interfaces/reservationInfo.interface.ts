import { Branch, Service } from "./isc-appointment.interface";

export interface ReservationInfo {
  notes:             null;
  resource:          Resource;
  created:           number;
  custom:            null;
  start:             string;
  numberOfCustomers: number;
  services:          Service[];
  title:             string;
  branch:            Branch;
  allDay:            boolean;
  blocking:          boolean;
  end:               string;
  customSlotLength:  null;
  customers:         any[];
  updated:           number;
  publicId:          string;
  status:            number;
}

export interface Resource {
  custom: string;
  name:   string;
}

