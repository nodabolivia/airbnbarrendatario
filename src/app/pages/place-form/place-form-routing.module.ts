import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaceFormPage } from './place-form.page';

const routes: Routes = [
  {
    path: '',
    component: PlaceFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceFormPageRoutingModule {}
