import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DicioRoutingModule } from './dicio-routing.module';
// import { DicioButtonModule } from '@dicio/pivot-angular';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DicioRoutingModule,
    // DicioButtonModule
  ]
})
export class DicioModule { }
