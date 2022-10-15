import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DicioRoutingModule } from './dicio-routing.module';
import { DicioButtonModule } from '@dicio/pivot-angular';
import { NewClientComponent } from './pages/new-client/new-client.component';
import { HomeComponent } from './pages/home/home.component';


@NgModule({
  declarations: [
    NewClientComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DicioRoutingModule,
    DicioButtonModule
  ]
})
export class DicioModule { }
