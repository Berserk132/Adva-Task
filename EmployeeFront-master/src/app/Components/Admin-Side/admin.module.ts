import { DialogDepartmentComponent } from './dialog-department/dialog-department.component';
import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { DepartmentDashboardComponent } from './department-dashboard/department-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { DialogEmployeeComponent } from './dialog-employee/dialog-employee.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    HomeAdminComponent,
    EmployeeDashboardComponent,
    DialogEmployeeComponent,
    EmployeeDetailsComponent,
    DepartmentDashboardComponent,
    DepartmentDetailsComponent,
    DialogDepartmentComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminSidenavComponent,
    HomeAdminComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
