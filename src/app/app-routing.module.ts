import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:id',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'booking-list/:id',
    loadChildren: () =>
      import('./pages/booking-list/booking-list.module').then(
        (m) => m.BookingListPageModule
      ),
  },
  {
    path: 'place-form/:id',
    loadChildren: () =>
      import('./pages/place-form/place-form.module').then(
        (m) => m.PlaceFormPageModule
      ),
  },
  {
    path: 'maps/:id',
    loadChildren: () =>
      import('./pages/maps/maps.module').then((m) => m.MapsPageModule),
  },
  {
    path: 'images/:id',
    loadChildren: () => import('./pages/images/images.module').then( m => m.ImagesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
