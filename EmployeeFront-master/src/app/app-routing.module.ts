import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './Components/Admin-Side/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, loadChildren: () => import('./Components/Admin-Side/admin-routing.module')
      .then(mod => mod.AdminRoutingModule), data: { breadcrumb: { skip: true } }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
