import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarService } from '../../../calendar/services/calendar.service';
import { Customer } from '../../../calendar/interfaces/isc-appointment.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cliente: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    externalId: '',
    publicId: null,
  };

  constructor(
    private router: Router,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {}

  dicio = {
    credentials: {
      id: '87943e1e-5b46-47b9-ad18-96991cb544d1',
      key: 'RVm0V7Vrxd9VOMRurlTVv7cm769B9YkN',
    },
    debug: true,
    variant: 'only_text',
    mode: 'prod',
    custom_process: 'https://app.proddicio.net',
    text: 'Nuevo Cliente',
  };

  status(status: any): void {
    console.log('integrador status -> ', status);

    switch (status.step) {
      case 'captura_id_ocr': {
        this.cliente.firstName = status.data.ObjectocrFront.nombres;
        this.cliente.lastName =
          status.data.ObjectocrFront.apellidoMaterno +
          ' ' +
          status.data.ObjectocrFront.apellidoMaterno;
        this.cliente.externalId = status.data.ObjectocrFront.curp;
        break;
      }
      case 'email_check': {
        this.cliente.email = status.data.email;
        break;
      }
      default: {
        break;
      }
    }
  }
  error(error: any): void {
    console.log('integrador error -> ', error);
  }
  finish(data: any): void {
    this.calendarService.cliente = this.cliente;
    this.router.navigate(['/iscCalendar/calendar']);
    console.log('integrador data -> ', data);
  }
}
