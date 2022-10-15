import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentFormComponent } from './pages/appointment-form/appointment-form.component';
import { AlreadyClientComponent } from './pages/already-client/already-client.component';
import { HomeScreenComponent } from './pages/home-screen/home-screen.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'homeScreen',
        component: HomeScreenComponent,
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
        path: 'confirmacion',
        component: ConfirmationComponent,
      },
      {
        path: '**',
        redirectTo: 'homeScreen',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
