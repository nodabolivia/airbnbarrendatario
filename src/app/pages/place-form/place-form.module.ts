import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceFormPageRoutingModule } from './place-form-routing.module';

import { PlaceFormPage } from './place-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PlaceFormPage]
})
export class PlaceFormPageModule {}
