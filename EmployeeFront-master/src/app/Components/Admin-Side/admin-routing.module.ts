import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DepartmentDashboardComponent } from './department-dashboard/department-dashboard.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';

const AdminRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'employee', component: EmployeeDashboardComponent },
  { path: 'department', component: DepartmentDashboardComponent },
  { path: 'home', component: HomeAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
