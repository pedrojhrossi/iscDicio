import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { resolve } from 'dns';
import { map, switchMap } from 'rxjs';
import { CalendarService } from '../../services/calendar.service';
import { AppointmentList } from '../../interfaces/isc-appointment.interface';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent implements OnInit {
  newAppointment: AppointmentList = {
    services: [],
    customers: [],
  };

  timeFormat = new Intl.DateTimeFormat('es', {
    timeStyle: 'short',
    timeZone: 'America/Mexico_City',
  });
  dateTimeFormat = new Intl.DateTimeFormat('es', {
    timeStyle: 'short',
    dateStyle: 'short',
    timeZone: 'America/Mexico_City',
  });

  confirmationInfo = {
    appointmentId: '',
    serviceName: '',
    oficina: '',
    ciudad: '',
    direccion: '',
    zipCode: '',
    fechaHora: '',
    customerEmail: '',
    customerNombre: '',
    customerApellido: '',
    customerNombreCompleto: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ publicId }) =>
          this.calendarService.getAppointmentByPublicId(publicId)
        )
      )
      .subscribe((appointmentBasicInfo) => {
        let customerId = appointmentBasicInfo.appointment.customers[0].id;
        let qpId = appointmentBasicInfo.appointment.qpId;
        this.calendarService
          .getCustomerById(customerId)
          .subscribe((customerFullInfo) => {
            const appointmentList: AppointmentList[] =
              customerFullInfo?.appointmentList
                ? customerFullInfo?.appointmentList
                : [];
            for (let i = 0; i < appointmentList.length; i++) {
              if (qpId === appointmentList[i].qpId) {
                this.newAppointment = appointmentList[i];
              }
            }

            let time = this.timeFormat
              .format(new Date(this.newAppointment.start || ''))
              .replace(':', '');
            time = time.length < 4 ? '0' + time : time;

            this.confirmationInfo = {
              appointmentId: this.newAppointment.qpId + time,
              serviceName: this.newAppointment.services[0].name,
              oficina: this.newAppointment.branch?.name || '',
              ciudad: this.newAppointment.branch?.addressCity || '',
              direccion:
                (this.newAppointment.branch?.addressLine1 || '') +
                ' ' +
                (this.newAppointment.branch?.addressLine2 || ''),
              zipCode: this.newAppointment.branch?.addressZip || '',
              fechaHora: this.dateTimeFormat.format(
                new Date(this.newAppointment.start || '')
              ),
              customerEmail: this.newAppointment.customers[0].email || '',
              customerNombre: this.newAppointment.customers[0].firstName || '',
              customerApellido: this.newAppointment.customers[0].lastName || '',
              customerNombreCompleto:
                this.newAppointment.customers[0].name || '',
            };
          });
      });
  }
}
