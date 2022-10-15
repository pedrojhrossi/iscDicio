import { Meta, Service } from "./isc-appointment.interface";

export interface ServiceList {
  meta:          Meta;
  serviceList:   Service[];
  notifications: any[];
}

