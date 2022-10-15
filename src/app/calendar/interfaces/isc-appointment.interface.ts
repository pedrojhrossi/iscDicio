export interface ISCAppointment {
  meta:            Meta;
  appointmentList: AppointmentList[];
  notifications:   any[];
}

export interface AppointmentList {

  id?:                number;
  qpId?:              number;
  notes:             string;
  resource:          Resource;
  created:           number;
  custom:            string;
  start:             string;
  numberOfCustomers: number;
  services:          Service[];
  title:             string;
  branch:            Branch;
  allDay:            boolean;
  blocking:          boolean;
  end:               string;
  customSlotLength:  number;
  customers:         Customer[];
  updated:           number;
  publicId:          string;
  status:            number;
}

export interface Branch {
  id:              number;
  qpId:            number;
  addressCountry?: string;
  addressZip?:     string;
  created?:        number;
  latitude?:       number;
  custom?:         string;
  timeZone?:       string;
  addressState?:   string;
  phone?:          string;
  name?:           string;
  addressLine1?:   string;
  addressLine2?:   string;
  fullTimeZone?:   string;
  updated?:        number;
  publicId?:       string;
  branchPrefix?:   string;
  email?:          string;
  addressCity?:    string;
  longitude?:      number;

}

export interface Customer {
  id?:                        number;
  qpId?:                      null;
  addressCountry?:           string;
  lastName?:                 string;
  addressZip?:               string;
  created?:                  number;
  lastInteractionTimestamp?: string;
  custom?:                   string;
  externalId?:               string;
  addressState?:             string;
  dateOfBirth?:              Date;
  consentTimestamp?:         string;
  dateOfBirthWithoutTime?:   Date;
  deletionTimestamp?:        string;
  firstName?:                string;
  phone?:                    string;
  consentIdentifier?:        string;
  name?:                     string;
  addressLine1?:             string;
  identificationNumber?:     string;
  addressLine2?:             string;
  retentionPolicy?:          string;
  updated?:                  string;
  publicId?:                 string | null;
  email?:                    string;
  addressCity?:              string;

}

export interface Resource {
  custom: string;
  name:   string;
}

export interface Service {
  id:                         number;
  qpId:                       number;
  name:                       string;
  active:                     boolean;
  duration:                   number;
  additionalCustomerDuration: number;
  publicId:                   string;
  publicEnabled:              boolean;
  created:                    number;
  updated:                    number;
  custom:                     null;
}

export interface Meta {
  start:        string;
  end:          string;
  totalResults: number;
  offset:       null;
  limit:        null;
  fields:       string;
  arguments:    Arguments;
}

export interface Arguments {
}

export interface QwbConfig {
  name:  string;
  value: string;
}
