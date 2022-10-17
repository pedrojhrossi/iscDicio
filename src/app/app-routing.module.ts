import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    redirectTo: 'dicioHome',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
