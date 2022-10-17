import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlreadyClientComponent } from './pages/already-client/already-client.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';


@NgModule({
  declarations: [
    AppointmentFormComponent,
    AlreadyClientComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
  ]
})
export class CalendarModule { }
