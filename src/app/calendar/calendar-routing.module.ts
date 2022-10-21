import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';
import { AlreadyClientComponent } from './pages/already-client/already-client.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { ServicesComponent } from './pages/services/services.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'client',
        component: AlreadyClientComponent,
      },
      {
        path: 'calendar',
        component: AppointmentFormComponent,
      },
      {
        path: 'confirmacion/:publicId',
        component: ConfirmationComponent,
      },
      {
        path: '**',
        redirectTo: 'services',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
