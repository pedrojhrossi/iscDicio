import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'iscCalendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CalendarModule),
  },

  {
    path: 'dicioHome',
    loadChildren: () =>
      import('./dicio/dicio.module').then((m) => m.DicioModule),
  },
  {
    path: '**',
    redirectTo: 'iscCalendar',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
