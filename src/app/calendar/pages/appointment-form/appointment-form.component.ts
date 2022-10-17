import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import {
  Branch,
  Service,
  Customer,
} from '../../interfaces/isc-appointment.interface';
import { CalendarService } from '../../services/calendar.service';
import { CalendarFormInfo } from '../../interfaces/appointmentInfo.interface';
import { ConfirmationBody } from '../../interfaces/confirmationBody.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  calendarForm: FormGroup = this.fb.group({
    branch: ['', Validators.required],
    service: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    notes: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    externalId: ['', Validators.required],
    publicId: [''],
    terminosCondiciones: [false, Validators.requiredTrue],
  });

  //* Llenar campos
  oficinas: Branch[] = [];
  servicios: Service[] = [];
  fechas: Date[] = [];
  horas: string[] = [];
  cliente: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    externalId: '',
    publicId: null,
  };
  dicioUser: Customer = {
    email: 'phernandez@isc-bunkerramo.com',
  };

  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.calendarService
      .getUserByEmail(this.dicioUser.email || '')
      .subscribe((resp) => {
        this.cliente = resp?.customerList[0] || {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          externalId: '',
          publicId: '',
        };

        this.calendarForm.get('firstname')?.setValue(this.cliente.firstName);
        this.calendarForm.get('lastname')?.setValue(this.cliente.lastName);
        this.calendarForm.get('email')?.setValue(this.cliente.email);
        this.calendarForm.get('phone')?.setValue(this.cliente.phone);
        this.calendarForm.get('externalId')?.setValue(this.cliente.externalId);
        this.calendarForm
          .get('publicId')
          ?.setValue(this.cliente.publicId || null);
      });

    this.calendarService.getAllBranches().subscribe((branchlist) => {
      this.oficinas = branchlist.branchList;
      let element;
      let nuevoArray = [];
      for (let index = 0; index < this.oficinas.length; index++) {
        element = this.oficinas[index];
        if (
          element.publicId ===
          'cc58438df345a7ac05cb5598b1557020ffe89a0b757f0f29c74f2b86e3e022b6'
        ) {
          nuevoArray.push(element);
        }
      }
      this.oficinas = nuevoArray;
    });

    //* Al cambiar la oficina
    this.calendarForm
      .get('branch')
      ?.valueChanges.pipe(
        tap(() => {
          this.calendarForm.get('service')?.reset('');
        }),
        switchMap((branchId) =>
          this.calendarService.getServicesByBranchId(branchId)
        )
      )
      .subscribe((servicesList) => {
        this.servicios = servicesList.serviceList;
      });

    //* Al cambiar el servicio
    this.calendarForm
      .get('service')
      ?.valueChanges.pipe(
        tap(() => {
          this.calendarForm.get('date')?.reset('');
        }),
        switchMap((servicePublicId) =>
          this.calendarService.getDatesAvailable(servicePublicId)
        )
      )
      .subscribe((datesAvailableList) => {
        let firstDayAvailable: string = datesAvailableList?.dates[0]
          ? new Date(datesAvailableList?.dates[0]).toISOString().split('T')[0]
          : '';
        this.calendarForm.get('date')?.setValue(firstDayAvailable);
        this.calendarService
          .getTimeAvailable(firstDayAvailable)
          .subscribe((timeAvailableList) => {
            this.horas = timeAvailableList?.times || [];
          });
        this.fechas = datesAvailableList?.dates || [];
      });

    //* Al cambiar el la fecha
    this.calendarForm
      .get('date')
      ?.valueChanges.pipe(
        tap(() => {
          this.calendarForm.get('time')?.reset('');
        }),
        switchMap((datesAvailableList) =>
          this.calendarService.getTimeAvailable(datesAvailableList)
        )
      )
      .subscribe((timeAvailableList) => {
        this.horas = timeAvailableList?.times || [];
      });
  }

  crearCita() {
    let appointmenInfo: CalendarFormInfo = this.calendarForm.value;

    if (this.calendarForm.invalid) {
      this.calendarForm.markAllAsTouched();
      return;
    }
    this.cliente = {
      firstName: appointmenInfo.firstname || '',
      lastName: appointmenInfo.lastname || '',
      email: appointmenInfo.email || '',
      phone: appointmenInfo.phone || '',
      externalId: appointmenInfo.externalId || '',
      publicId: appointmenInfo.publicId || null,
    };

    let cuerpoConfirmacion: ConfirmationBody = {
      notes: '',
      customers: [this.cliente],
    };

    this.calendarService
      .reserveAppoinment(appointmenInfo.time)
      .subscribe((reserva) => {
        if (reserva) {
          this.calendarService
            .confirmAppoinment(reserva.publicId, cuerpoConfirmacion)
            .subscribe((citaCreada) => {
              if (citaCreada) {
                alert('CITA CREADA CON EXITO ' + citaCreada?.publicId);
                this.calendarForm.reset();
                this.router.navigate([
                  '/iscCalendar/confirmacion',
                  citaCreada?.publicId,
                ]);
              } else {
                alert('OCURRIO UN ERROR AL INTENTAR GENERAR LA CITA');
              }
            });
        } else {
          alert('OCURRIO UN ERROR AL INTENTAR GENERAR LA CITA');
        }
      });
  }
}
